import type { Pool } from "pg";

declare module "fastify" {
  interface FastifyInstance {
    pg: Pool;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { sub: string; email: string; role: string };
    user: { sub: string; email: string; role: string };
  }
}

export {};
