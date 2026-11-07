import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { parseOrReply } from "../lib/validate.js";
import { requireAuth, requireRole } from "../plugins/auth.js";

const recordStatus = z.enum(["active", "pending", "archived"]);

const recordBodySchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  category: z.string().trim().min(1, "Category is required."),
  status: recordStatus,
  value: z.number().finite("Value must be a number.")
});

const recordPatchSchema = recordBodySchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: "Provide at least one field to update."
});

interface RecordRow {
  id: string;
  title: string;
  category: string;
  status: "active" | "pending" | "archived";
  value: string;
  updated_at: Date;
}

function toRecord(row: RecordRow) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    status: row.status,
    value: Number(row.value),
    updatedAt: new Date(row.updated_at).toISOString()
  };
}

export async function recordsRoutes(app: FastifyInstance): Promise<void> {
  app.get("/api/records", { preHandler: requireAuth }, async () => {
    const result = await app.pg.query<RecordRow>(
      `SELECT id, title, category, status, value, updated_at
       FROM records
       ORDER BY updated_at DESC, id ASC`
    );
    return { success: true, data: result.rows.map(toRecord) };
  });

  app.get("/api/records/:id", { preHandler: requireAuth }, async (request, reply) => {
    const params = parseOrReply(z.object({ id: z.string().min(1) }), request.params, reply);
    if (!params) return;

    const result = await app.pg.query<RecordRow>(
      `SELECT id, title, category, status, value, updated_at
       FROM records
       WHERE id = $1`,
      [params.id]
    );
    const row = result.rows[0];
    if (!row) {
      return reply.status(404).send({ success: false, message: "Record not found." });
    }
    return { success: true, data: toRecord(row) };
  });

  app.post("/api/records", { preHandler: requireRole("admin", "manager") }, async (request, reply) => {
    const body = parseOrReply(recordBodySchema, request.body, reply);
    if (!body) return;

    const id = `REC-${Date.now().toString(36).toUpperCase()}`;
    const result = await app.pg.query<RecordRow>(
      `INSERT INTO records (id, title, category, status, value, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, title, category, status, value, updated_at`,
      [id, body.title, body.category, body.status, body.value]
    );
    return reply.status(201).send({
      success: true,
      data: toRecord(result.rows[0]),
      message: "Record created."
    });
  });

  app.patch("/api/records/:id", { preHandler: requireRole("admin", "manager") }, async (request, reply) => {
    const params = parseOrReply(z.object({ id: z.string().min(1) }), request.params, reply);
    if (!params) return;
    const body = parseOrReply(recordPatchSchema, request.body, reply);
    if (!body) return;

    const existing = await app.pg.query<RecordRow>(
      `SELECT id, title, category, status, value, updated_at
       FROM records
       WHERE id = $1`,
      [params.id]
    );
    const current = existing.rows[0];
    if (!current) {
      return reply.status(404).send({ success: false, message: "Record not found." });
    }

    const next = {
      title: body.title ?? current.title,
      category: body.category ?? current.category,
      status: body.status ?? current.status,
      value: body.value ?? Number(current.value)
    };

    const updated = await app.pg.query<RecordRow>(
      `UPDATE records
       SET title = $2, category = $3, status = $4, value = $5, updated_at = NOW()
       WHERE id = $1
       RETURNING id, title, category, status, value, updated_at`,
      [params.id, next.title, next.category, next.status, next.value]
    );

    return {
      success: true,
      data: toRecord(updated.rows[0]),
      message: "Record updated."
    };
  });
}
