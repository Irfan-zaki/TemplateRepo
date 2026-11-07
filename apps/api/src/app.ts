import Fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { authRoutes } from "./features/auth/routes.js";
import { healthRoutes } from "./features/health/routes.js";
import { recordsRoutes } from "./features/records/routes.js";
import { registerAuth } from "./plugins/auth.js";
import { registerDb } from "./plugins/db.js";
import { registerErrorHandler } from "./plugins/errors.js";

export async function buildApp(options?: { logger?: boolean }): Promise<FastifyInstance> {
  const app = Fastify({ logger: options?.logger ?? true });

  await app.register(cors, { origin: "*" });
  registerDb(app);
  await registerAuth(app);
  registerErrorHandler(app);

  await app.register(healthRoutes);
  await app.register(authRoutes);
  await app.register(recordsRoutes);

  return app;
}
