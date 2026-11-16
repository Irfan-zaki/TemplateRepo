import { buildApp } from "./src/app.ts";
import { migrate } from "./src/db/migrate.ts";
import { closePool } from "./src/db/pool.ts";
import { runDatabaseSeed } from "./src/db/seeds/index.ts";
import { DEV_PASSWORD } from "./src/db/seeds/starter.seed.ts";

function assert(condition, message, state) {
  if (condition) {
    console.log(`  PASS: ${message}`);
    state.passed += 1;
  } else {
    console.error(`  FAIL: ${message}`);
    state.failed += 1;
  }
}

async function runTests() {
  const state = { passed: 0, failed: 0 };
  console.log("Preparing database and Fastify app...");
  await migrate();
  await runDatabaseSeed();

  const app = await buildApp({ logger: false });
  await app.ready();

  console.log("\n1. GET /api/health");
  const health = await app.inject({ method: "GET", url: "/api/health" });
  const healthBody = health.json();
  assert(health.statusCode === 200, "status is 200", state);
  assert(healthBody.status === "ok", "body status is ok", state);

  console.log("\n2. GET /api/records without a token");
  const locked = await app.inject({ method: "GET", url: "/api/records" });
  assert(locked.statusCode === 401, "status is 401", state);

  console.log("\n3. POST /api/auth/login as admin");
  const login = await app.inject({
    method: "POST",
    url: "/api/auth/login",
    payload: { email: "admin@starter.dev", password: DEV_PASSWORD }
  });
  const loginBody = login.json();
  assert(login.statusCode === 200, "status is 200", state);
  assert(typeof loginBody.data?.token === "string" && loginBody.data.token.length > 10, "token returned", state);
  const adminToken = loginBody.data.token;

  console.log("\n4. GET /api/auth/me");
  const me = await app.inject({
    method: "GET",
    url: "/api/auth/me",
    headers: { authorization: `Bearer ${adminToken}` }
  });
  const meBody = me.json();
  assert(me.statusCode === 200, "status is 200", state);
  assert(meBody.data?.role === "admin", "role is admin", state);

  console.log("\n5. GET /api/records as admin");
  const records = await app.inject({
    method: "GET",
    url: "/api/records",
    headers: { authorization: `Bearer ${adminToken}` }
  });
  const recordsBody = records.json();
  assert(records.statusCode === 200, "status is 200", state);
  assert(Array.isArray(recordsBody.data) && recordsBody.data.length >= 5, "seed records are present", state);

  const email = `e2e-${Date.now().toString(36)}@starter.dev`;
  const signupPayload = {
    fullName: "E2E User",
    email,
    companyName: "HackCore",
    role: "manager",
    password: "Password123!",
    agreeToTerms: true
  };

  console.log("\n6. POST /api/auth/signup");
  const signup = await app.inject({ method: "POST", url: "/api/auth/signup", payload: signupPayload });
  const signupBody = signup.json();
  assert(signup.statusCode === 201, "status is 201", state);
  assert(signupBody.data?.email === email, "email matches", state);
  assert(signupBody.data?.userId?.startsWith("usr-"), "user id prefix", state);
  assert(typeof signupBody.data?.token === "string", "signup token returned", state);

  console.log("\n7. POST /api/auth/signup duplicate email");
  const conflict = await app.inject({ method: "POST", url: "/api/auth/signup", payload: signupPayload });
  const conflictBody = conflict.json();
  assert(conflict.statusCode === 409, "status is 409", state);
  assert(conflictBody.message?.includes("already registered"), "conflict message", state);

  console.log("\n8. POST /api/auth/login bad password");
  const badLogin = await app.inject({
    method: "POST",
    url: "/api/auth/login",
    payload: { email: "admin@starter.dev", password: "not-the-password" }
  });
  assert(badLogin.statusCode === 401, "status is 401", state);

  console.log("\n9. Member cannot create a record");
  const memberLogin = await app.inject({
    method: "POST",
    url: "/api/auth/login",
    payload: { email: "member@starter.dev", password: DEV_PASSWORD }
  });
  const memberToken = memberLogin.json().data.token;
  const forbidden = await app.inject({
    method: "POST",
    url: "/api/records",
    headers: { authorization: `Bearer ${memberToken}` },
    payload: { title: "Blocked", category: "Test", status: "pending", value: 1 }
  });
  assert(forbidden.statusCode === 403, "status is 403", state);

  console.log("\n10. Admin create, read, and update a record");
  const created = await app.inject({
    method: "POST",
    url: "/api/records",
    headers: { authorization: `Bearer ${adminToken}` },
    payload: { title: "E2E Record", category: "Test", status: "pending", value: 42 }
  });
  const createdBody = created.json();
  assert(created.statusCode === 201, "create status is 201", state);
  const recordId = createdBody.data?.id;

  const fetched = await app.inject({
    method: "GET",
    url: `/api/records/${recordId}`,
    headers: { authorization: `Bearer ${adminToken}` }
  });
  assert(fetched.statusCode === 200, "read status is 200", state);
  assert(fetched.json().data?.title === "E2E Record", "title matches", state);

  const patched = await app.inject({
    method: "PATCH",
    url: `/api/records/${recordId}`,
    headers: { authorization: `Bearer ${adminToken}` },
    payload: { title: "E2E Record Updated", status: "active" }
  });
  assert(patched.statusCode === 200, "update status is 200", state);
  assert(patched.json().data?.title === "E2E Record Updated", "title updated", state);
  assert(patched.json().data?.status === "active", "status updated", state);

  console.log(`\nResults: ${state.passed} passed, ${state.failed} failed`);
  await app.close();
  await closePool();

  if (state.failed > 0) {
    process.exit(1);
  }
}

runTests().catch(async (error) => {
  console.error("Test execution failed:", error);
  try {
    await closePool();
  } catch {
    // Pool may already be closed.
  }
  process.exit(1);
});
