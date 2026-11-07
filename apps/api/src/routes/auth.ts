import type { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { isUniqueViolation, parseOrReply } from "../lib/validate.js";
import { requireAuth, ROLES } from "../plugins/auth.js";

const signupSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  companyName: z.string().trim().min(1, "Company or organization name is required."),
  role: z.enum(ROLES),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  agreeToTerms: z.boolean().refine((value) => value, "You must accept the terms.")
});

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required.")
});

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  company_name: string;
  role: string;
  created_at: Date;
}

function toAuthUser(row: UserRow) {
  return {
    userId: row.id,
    fullName: row.name,
    email: row.email,
    companyName: row.company_name,
    role: row.role,
    createdAt: new Date(row.created_at).toISOString()
  };
}

export async function authRoutes(app: FastifyInstance): Promise<void> {
  app.post("/api/auth/signup", async (request, reply) => {
    const body = parseOrReply(signupSchema, request.body, reply);
    if (!body) return;

    const email = body.email.toLowerCase();
    const passwordHash = await bcrypt.hash(body.password, 10);
    const id = `usr-${Date.now().toString(36)}`;

    try {
      const inserted = await app.pg.query<UserRow>(
        `INSERT INTO users (id, email, password_hash, name, company_name, role)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, email, password_hash, name, company_name, role, created_at`,
        [id, email, passwordHash, body.fullName, body.companyName, body.role]
      );
      const user = inserted.rows[0];
      const token = await reply.jwtSign({ sub: user.id, email: user.email, role: user.role });
      return reply.status(201).send({
        success: true,
        data: { ...toAuthUser(user), token },
        message: "Account provisioned successfully."
      });
    } catch (error) {
      if (isUniqueViolation(error)) {
        return reply.status(409).send({
          success: false,
          message: `The work email '${email}' is already registered.`
        });
      }
      throw error;
    }
  });

  app.post("/api/auth/login", async (request, reply) => {
    const body = parseOrReply(loginSchema, request.body, reply);
    if (!body) return;

    const email = body.email.toLowerCase();
    const found = await app.pg.query<UserRow>(
      `SELECT id, email, password_hash, name, company_name, role, created_at
       FROM users
       WHERE email = $1`,
      [email]
    );
    const user = found.rows[0];
    const matches = user ? await bcrypt.compare(body.password, user.password_hash) : false;

    if (!user || !matches) {
      return reply.status(401).send({
        success: false,
        message: "Email or password is incorrect."
      });
    }

    const token = await reply.jwtSign({ sub: user.id, email: user.email, role: user.role });
    return reply.send({
      success: true,
      data: { ...toAuthUser(user), token },
      message: "Signed in."
    });
  });

  app.get("/api/auth/me", { preHandler: requireAuth }, async (request, reply) => {
    const found = await app.pg.query<UserRow>(
      `SELECT id, email, password_hash, name, company_name, role, created_at
       FROM users
       WHERE id = $1`,
      [request.user.sub]
    );
    const user = found.rows[0];
    if (!user) {
      return reply.status(401).send({ success: false, message: "Authentication required." });
    }
    return { success: true, data: toAuthUser(user) };
  });
}
