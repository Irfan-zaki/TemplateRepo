import path from "node:path";
import { fileURLToPath } from "node:url";
import { migrate as runDrizzleMigrations } from "drizzle-orm/node-postgres/migrator";
import { db } from "./client.js";
import { closePool } from "./pool.js";

const migrationsFolder = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../drizzle");

export async function migrate(): Promise<void> {
  await runDrizzleMigrations(db, { migrationsFolder });
  console.log("[migrate] drizzle migrations applied");
}

const invoked = process.argv[1] ?? "";
if (invoked.endsWith("migrate.ts") || invoked.endsWith("migrate.js")) {
  migrate()
    .then(() => closePool())
    .catch(async (error: unknown) => {
      console.error("[migrate] failed", error);
      await closePool();
      process.exit(1);
    });
}
