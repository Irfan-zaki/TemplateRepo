import type { FastifyInstance } from "fastify";
import { pool } from "../db/pool.js";

export function registerDb(app: FastifyInstance): void {
  app.decorate("pg", pool);
}
