import bcrypt from "bcryptjs";
import { db } from "../client.js";
import { closePool } from "../pool.js";
import { records } from "../schema/records.js";
import { users } from "../schema/users.js";
import { DEV_PASSWORD, starterRecordsSeedData, starterUsersSeedData } from "./starter.seed.js";

export async function runDatabaseSeed(): Promise<void> {
  console.log("[seed] writing starter users and records");
  const passwordHash = await bcrypt.hash(DEV_PASSWORD, 10);

  for (const user of starterUsersSeedData) {
    await db
      .insert(users)
      .values({
        id: user.id,
        email: user.email,
        passwordHash,
        name: user.name,
        companyName: "HackCore",
        role: user.role
      })
      .onConflictDoNothing({ target: users.email });
  }

  for (const record of starterRecordsSeedData) {
    await db
      .insert(records)
      .values({
        id: record.id,
        title: record.title,
        category: record.category,
        status: record.status,
        value: record.value,
        updatedAt: new Date(record.updatedAt)
      })
      .onConflictDoNothing({ target: records.id });
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
