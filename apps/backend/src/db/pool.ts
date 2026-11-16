import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import pg from "pg";

const here = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(here, "../../.env") });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing. Copy apps/backend/.env.example to apps/backend/.env");
}

export const pool = new pg.Pool({ connectionString });

export async function closePool(): Promise<void> {
  await pool.end();
}
