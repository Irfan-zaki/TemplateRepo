import bcrypt from "bcryptjs";
import { closePool, pool } from "../pool.js";
import { DEV_PASSWORD, starterRecordsSeedData, starterUsersSeedData } from "./starter.seed.js";

export async function runDatabaseSeed(): Promise<void> {
  console.log("[seed] writing starter users and records");
  const passwordHash = await bcrypt.hash(DEV_PASSWORD, 10);

  for (const user of starterUsersSeedData) {
    await pool.query(
      `INSERT INTO users (id, email, password_hash, name, company_name, role)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (email) DO NOTHING`,
      [user.id, user.email, passwordHash, user.name, "HackCore", user.role]
    );
  }

  for (const record of starterRecordsSeedData) {
    await pool.query(
      `INSERT INTO records (id, title, category, status, value, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO NOTHING`,
      [record.id, record.title, record.category, record.status, record.value, new Date(record.updatedAt)]
    );
  }

  console.log(`[seed] users ready: ${starterUsersSeedData.length}`);
  console.log(`[seed] records ready: ${starterRecordsSeedData.length}`);
  console.log(`[seed] demo password: ${DEV_PASSWORD}`);
}

const invoked = process.argv[1] ?? "";
if (invoked.endsWith("seeds/index.ts") || invoked.endsWith("seeds/index.js")) {
  runDatabaseSeed()
    .then(() => closePool())
    .catch(async (error: unknown) => {
      console.error("[seed] failed", error);
      await closePool();
      process.exit(1);
    });
}
