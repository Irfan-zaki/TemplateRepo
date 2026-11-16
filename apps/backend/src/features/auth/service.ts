import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "../../db/client.js";
import { users } from "../../db/schema/users.js";
import { isUniqueViolation } from "../../lib/validate.js";
import { ServiceError } from "../../lib/service-error.js";
import type { LoginInput, SignupInput } from "./schema.js";

export interface AuthUser {
  userId: string;
  fullName: string;
  email: string;
  companyName: string;
  role: string;
  createdAt: string;
}

function toAuthUser(row: typeof users.$inferSelect): AuthUser {
  return {
    userId: row.id,
    fullName: row.name,
    email: row.email,
    companyName: row.companyName,
    role: row.role,
    createdAt: row.createdAt.toISOString()
  };
}

export async function signup(input: SignupInput): Promise<AuthUser> {
  const email = input.email.toLowerCase();
  const passwordHash = await bcrypt.hash(input.password, 10);

  try {
    const [row] = await db
      .insert(users)
      .values({
        id: `usr-${Date.now().toString(36)}`,
        email,
        passwordHash,
        name: input.fullName,
        companyName: input.companyName,
        role: input.role
      })
      .returning();
    return toAuthUser(row);
  } catch (error) {
    if (isUniqueViolation(error)) {
      throw new ServiceError(409, `The work email '${email}' is already registered.`);
    }
    throw error;
  }
}

export async function login(input: LoginInput): Promise<AuthUser> {
  const email = input.email.toLowerCase();
  const [row] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const matches = row ? await bcrypt.compare(input.password, row.passwordHash) : false;

  if (!row || !matches) {
    throw new ServiceError(401, "Email or password is incorrect.");
  }

  return toAuthUser(row);
}

export async function getCurrentUser(userId: string): Promise<AuthUser> {
  const [row] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!row) {
    throw new ServiceError(401, "Authentication required.");
  }
  return toAuthUser(row);
}
