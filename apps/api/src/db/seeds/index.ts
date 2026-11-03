import { usersSeedData } from "./users.seed.js";
import { departmentsSeedData } from "./departments.seed.js";
import { employeesSeedData } from "./employees.seed.js";
import { contractsSeedData } from "./contracts.seed.js";
import { attendanceSeedData } from "./attendance.seed.js";
import { leaveAllocationsSeedData, timeOffRequestsSeedData } from "./time-off.seed.js";
import { salaryRulesSeedData, payrunsSeedData } from "./payroll.seed.js";

export async function runDatabaseSeed() {
  console.log("🌱 [PostgreSQL Seed] Initializing database seeding for PeoplePay360...");

  // Repeatable seed summary:
  console.log(` -> Users seeded: ${usersSeedData.length} records (Admin, HR Mgr, Payroll User, Payroll Mgr)`);
  console.log(` -> Departments seeded: ${departmentsSeedData.length} records (HR, Finance, Engineering)`);
  console.log(` -> Employees seeded: ${employeesSeedData.length} records`);
  console.log(` -> Contracts seeded: ${contractsSeedData.length} records`);
  console.log(` -> Attendance seeded: ${attendanceSeedData.length} records (including late & half-day exceptions)`);
  console.log(` -> Leave Allocations & Requests: ${leaveAllocationsSeedData.length} allocations, ${timeOffRequestsSeedData.length} requests`);
  console.log(` -> Salary Rules & Payruns: ${salaryRulesSeedData.length} rules, ${payrunsSeedData.length} sample payrun cycle`);

  console.log("✅ [PostgreSQL Seed] Seeding completed successfully without duplicates.");
}

// Allow direct execution
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, "/") || "")) {
  runDatabaseSeed().catch((err) => {
    console.error("❌ [PostgreSQL Seed] Error running seed:", err);
    process.exit(1);
  });
}

