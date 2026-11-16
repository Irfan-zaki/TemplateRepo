import type { FastifyInstance } from "fastify";
import { db } from "../db/client.js";
import { pool } from "../db/pool.js";

export function registerDb(app: FastifyInstance): void {
  app.decorate("pg", pool);
  app.decorate("db", db);
}
