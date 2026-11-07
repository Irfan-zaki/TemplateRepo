import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type { Pool } from "pg";
import type * as schema from "../db/schema/index.js";

declare module "fastify" {
  interface FastifyInstance {
    pg: Pool;
    db: NodePgDatabase<typeof schema>;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { sub: string; email: string; role: string };
    user: { sub: string; email: string; role: string };
  }
}

export {};
