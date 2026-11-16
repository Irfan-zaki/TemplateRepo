import { buildApp } from "./app.js";
import { closePool } from "./db/pool.js";

const app = await buildApp();
const port = Number(process.env.PORT) || 3000;

try {
  await app.listen({ port, host: "0.0.0.0" });
} catch (error) {
  app.log.error(error);
  await closePool();
  process.exit(1);
}
