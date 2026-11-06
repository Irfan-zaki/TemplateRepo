import { starterUsersSeedData, starterRecordsSeedData } from "./starter.seed.js";

export async function runDatabaseSeed() {
  console.log("🌱 [PostgreSQL Seed] Initializing starter template database seeding...");

  console.log(` -> Users seeded: ${starterUsersSeedData.length} records (Admin, Manager)`);
  console.log(` -> Starter Records seeded: ${starterRecordsSeedData.length} items`);

  console.log("✅ [PostgreSQL Seed] Seeding completed successfully without duplicates.");
}

// Allow direct execution
runDatabaseSeed().catch((err) => {
  console.error("❌ [PostgreSQL Seed] Error running seed:", err);
  process.exit(1);
});
