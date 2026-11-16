import type { FastifyReply, FastifyRequest } from "fastify";
import jwt from "@fastify/jwt";
import type { FastifyInstance } from "fastify";
import { USER_ROLES, type UserRole } from "../db/schema/users.js";

// Fastify "plugin": shared server machinery every feature uses.
// Signup, login, and password rules live in features/auth, not here.

export const ROLES = USER_ROLES;
export type Role = UserRole;

export async function registerAuth(app: FastifyInstance): Promise<void> {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is missing. Copy apps/backend/.env.example to apps/backend/.env");
  }
  await app.register(jwt, { secret });
}

export async function requireAuth(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    await request.jwtVerify();
  } catch {
    reply.status(401).send({ success: false, message: "Authentication required." });
  }
}

export function requireRole(...roles: Role[]) {
  return async function checkRole(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      await request.jwtVerify();
    } catch {
      reply.status(401).send({ success: false, message: "Authentication required." });
      return;
    }

    if (!roles.includes(request.user.role as Role)) {
      reply.status(403).send({ success: false, message: "You do not have access to this action." });
    }
  };
}
