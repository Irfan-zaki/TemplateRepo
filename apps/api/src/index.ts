import Fastify from "fastify";
import cors from "@fastify/cors";
import { employeesSeedData } from "./db/seeds/employees.seed.js";
import { attendanceSeedData } from "./db/seeds/attendance.seed.js";
import { timeOffRequestsSeedData } from "./db/seeds/time-off.seed.js";
import { salaryRulesSeedData, payrunsSeedData } from "./db/seeds/payroll.seed.js";

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: "*"
});

// Centralized real API endpoints
fastify.get("/api/employees", async () => {
  return {
    success: true,
    data: employeesSeedData
  };
});

fastify.get("/api/attendance", async () => {
  return {
    success: true,
    data: attendanceSeedData
  };
});

fastify.get("/api/time-off/requests", async () => {
  return {
    success: true,
    data: timeOffRequestsSeedData
  };
});

fastify.get("/api/salary-rules", async () => {
  return {
    success: true,
    data: salaryRulesSeedData
  };
});

fastify.get("/api/payruns", async () => {
  return {
    success: true,
    data: payrunsSeedData
  };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await fastify.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Fastify backend running on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

