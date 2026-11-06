import Fastify from "fastify";
import cors from "@fastify/cors";
import { starterRecordsSeedData } from "./db/seeds/starter.seed.js";

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: "*"
});

// Health check endpoint
fastify.get("/api/health", async () => {
  return {
    status: "ok",
    timestamp: new Date().toISOString()
  };
});

// Generic starter records endpoint (matches frontend Records starter feature)
fastify.get("/api/records", async () => {
  return {
    success: true,
    data: starterRecordsSeedData
  };
});

// Authentication registration endpoint
fastify.post("/api/auth/signup", async (request, reply) => {
  const body = request.body as Record<string, string>;

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
