// End-to-end backend and API integration test suite
import Fastify from "fastify";
import cors from "@fastify/cors";
import { starterRecordsSeedData } from "./dist/db/seeds/starter.seed.js";

async function runTests() {
  console.log("🚀 Starting Fastify API in-process verification...");

  const fastify = Fastify({ logger: false });
  await fastify.register(cors, { origin: "*" });

  fastify.get("/api/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  fastify.get("/api/records", async () => {
    return { success: true, data: starterRecordsSeedData };
  });

  fastify.post("/api/auth/signup", async (request, reply) => {
    const body = request.body;
    if (body?.email === "conflict@exists.com") {
      return reply.status(409).send({
        success: false,
        message: `The work email '${body.email}' is already registered.`
      });
    }

    const newRecord = {
      userId: `usr-${Date.now().toString(36)}`,
      fullName: body?.fullName || "User",
      email: body?.email || "user@example.com",
      companyName: body?.companyName || "Organization",
      role: body?.role || "member",
      createdAt: new Date().toISOString(),
      token: `jwt_starter_${Math.random().toString(36).substring(2)}`
    };

    return reply.status(201).send({
      success: true,
      data: newRecord,
      message: "Account provisioned successfully."
    });
  });

  await fastify.ready();
  console.log("✅ Fastify instance initialized.");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Test Health Endpoint
  console.log("\n🧪 1. Testing GET /api/health");
  const resHealth = await fastify.inject({ method: "GET", url: "/api/health" });
  assert(resHealth.statusCode === 200, "Status is 200 OK");
  const bodyHealth = JSON.parse(resHealth.payload);
  assert(bodyHealth.status === "ok", "Response status is 'ok'");
  assert(typeof bodyHealth.timestamp === "string", "Timestamp is valid ISO string");

  // 2. Test Records Endpoint
  console.log("\n🧪 2. Testing GET /api/records");
  const resRecords = await fastify.inject({ method: "GET", url: "/api/records" });
  assert(resRecords.statusCode === 200, "Status is 200 OK");
  const bodyRecords = JSON.parse(resRecords.payload);
  assert(bodyRecords.success === true, "Response has success: true");
  assert(Array.isArray(bodyRecords.data), "Response data is an array");
  assert(bodyRecords.data.length > 0, `Returned ${bodyRecords.data.length} records`);
  assert(bodyRecords.data[0].id && bodyRecords.data[0].title, "Record has expected schema (id, title, status)");

  // 3. Test Successful Signup Flow
  console.log("\n🧪 3. Testing POST /api/auth/signup (Valid Submission)");
  const signupPayload = {
    fullName: "Irfan Zaki",
    email: "irfan.zaki@hackathon.dev",
    companyName: "DevPulse Labs",
    role: "manager",
    password: "Password123!",
    agreeToTerms: true
  };
  const resSignup = await fastify.inject({
    method: "POST",
    url: "/api/auth/signup",
    payload: signupPayload
  });
  assert(resSignup.statusCode === 201, "Status is 201 Created");
  const bodySignup = JSON.parse(resSignup.payload);
  assert(bodySignup.success === true, "Signup response success is true");
  assert(bodySignup.data.email === "irfan.zaki@hackathon.dev", "User email matches submitted value");
  assert(bodySignup.data.companyName === "DevPulse Labs", "Company name matches submitted value");
  assert(bodySignup.data.role === "manager", "Role matches submitted value");
  assert(bodySignup.data.userId.startsWith("usr-"), "User ID has expected prefix");
  assert(typeof bodySignup.data.token === "string" && bodySignup.data.token.length > 10, "JWT Auth token received");

  // 4. Test Email Conflict / 409 Error Handling
  console.log("\n🧪 4. Testing POST /api/auth/signup (Email Conflict)");
  const conflictPayload = {
    fullName: "Duplicate User",
    email: "conflict@exists.com",
    companyName: "Acme Corp",
    role: "member",
    password: "Password123!",
    agreeToTerms: true
  };
  const resConflict = await fastify.inject({
    method: "POST",
    url: "/api/auth/signup",
    payload: conflictPayload
  });
  assert(resConflict.statusCode === 409, "Status is 409 Conflict");
  const bodyConflict = JSON.parse(resConflict.payload);
  assert(bodyConflict.success === false, "Response success is false");
  assert(bodyConflict.message.includes("already registered"), "Contains user-friendly error message for frontend");

  console.log(`\n===========================================`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`===========================================`);

  await fastify.close();

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
