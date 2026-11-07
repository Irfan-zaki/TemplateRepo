import Fastify, { type FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { registerAuth } from "./plugins/auth.js";
import { registerDb } from "./plugins/db.js";
import { registerErrorHandler } from "./plugins/errors.js";
import { authRoutes } from "./routes/auth.js";
import { healthRoutes } from "./routes/health.js";
import { recordsRoutes } from "./routes/records.js";

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
