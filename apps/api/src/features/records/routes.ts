import type { FastifyInstance } from "fastify";
import { parseOrReply } from "../../lib/validate.js";
import { ServiceError } from "../../lib/service-error.js";
import { requireAuth, requireRole } from "../../plugins/auth.js";
import { recordBodySchema, recordIdSchema, recordPatchSchema } from "./schema.js";
import { createRecord, getRecord, listRecords, updateRecord } from "./service.js";

function sendKnownError(error: unknown, reply: { status: (code: number) => { send: (body: unknown) => unknown } }): boolean {
  if (error instanceof ServiceError) {
    reply.status(error.statusCode).send({ success: false, message: error.message });
    return true;
  }
  return false;
}

export async function recordsRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/records", { preHandler: requireAuth }, async () => {
    return { success: true, data: await listRecords() };
  });

  app.get("/api/records/:id", { preHandler: requireAuth }, async (request, reply) => {
    const params = parseOrReply(recordIdSchema, request.params, reply);
    if (!params) return;
    try {
      return { success: true, data: await getRecord(params.id) };
    } catch (error) {
      if (sendKnownError(error, reply)) return;
      throw error;
    }
  });

  app.post("/api/records", { preHandler: requireRole("admin", "manager") }, async (request, reply) => {
    const body = parseOrReply(recordBodySchema, request.body, reply);
    if (!body) return;
    const record = await createRecord(body);
    return reply.status(201).send({ success: true, data: record, message: "Record created." });
  });

  app.patch("/api/records/:id", { preHandler: requireRole("admin", "manager") }, async (request, reply) => {
    const params = parseOrReply(recordIdSchema, request.params, reply);
    if (!params) return;
    const body = parseOrReply(recordPatchSchema, request.body, reply);
    if (!body) return;
    try {
      return { success: true, data: await updateRecord(params.id, body), message: "Record updated." };
    } catch (error) {
      if (sendKnownError(error, reply)) return;
      throw error;
    }
  });
}
