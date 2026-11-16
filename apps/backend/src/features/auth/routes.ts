import type { FastifyInstance } from "fastify";
import { parseOrReply } from "../../lib/validate.js";
import { ServiceError } from "../../lib/service-error.js";
import { requireAuth } from "../../plugins/auth.js";
import { loginSchema, signupSchema } from "./schema.js";
import { getCurrentUser, login, signup } from "./service.js";

function sendKnownError(error: unknown, reply: { status: (code: number) => { send: (body: unknown) => unknown } }): boolean {
  if (error instanceof ServiceError) {
    reply.status(error.statusCode).send({ success: false, message: error.message });
    return true;
  }
  return false;
}

export async function authRoutes(app: FastifyInstance): Promise<void> {
  app.post("/api/auth/signup", async (request, reply) => {
    const body = parseOrReply(signupSchema, request.body, reply);
    if (!body) return;

    try {
      const user = await signup(body);
      const token = await reply.jwtSign({ sub: user.userId, email: user.email, role: user.role });
      return reply.status(201).send({
        success: true,
        data: { ...user, token },
        message: "Account provisioned successfully."
      });
    } catch (error) {
      if (sendKnownError(error, reply)) return;
      throw error;
    }
  });

  app.post("/api/auth/login", async (request, reply) => {
    const body = parseOrReply(loginSchema, request.body, reply);
    if (!body) return;

    try {
      const user = await login(body);
      const token = await reply.jwtSign({ sub: user.userId, email: user.email, role: user.role });
      return reply.send({
        success: true,
        data: { ...user, token },
        message: "Signed in."
      });
    } catch (error) {
      if (sendKnownError(error, reply)) return;
      throw error;
    }
  });

  app.get("/api/auth/me", { preHandler: requireAuth }, async (request, reply) => {
    try {
      const user = await getCurrentUser(request.user.sub);
      return { success: true, data: user };
    } catch (error) {
      if (sendKnownError(error, reply)) return;
      throw error;
    }
  });
}
