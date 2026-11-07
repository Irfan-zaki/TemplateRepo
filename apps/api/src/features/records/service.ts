import { asc, desc, eq } from "drizzle-orm";
import { db } from "../../db/client.js";
import { records } from "../../db/schema/records.js";
import { ServiceError } from "../../lib/service-error.js";
import type { RecordInput, RecordPatch } from "./schema.js";

export interface RecordItem {
  id: string;
  title: string;
  category: string;
  status: string;
  value: number;
  updatedAt: string;
}

function toRecord(row: typeof records.$inferSelect): RecordItem {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    status: row.status,
    value: row.value,
    updatedAt: row.updatedAt.toISOString()
  };
}

export async function listRecords(): Promise<RecordItem[]> {
  const rows = await db.select().from(records).orderBy(desc(records.updatedAt), asc(records.id));
  return rows.map(toRecord);
}

export async function getRecord(id: string): Promise<RecordItem> {
  const [row] = await db.select().from(records).where(eq(records.id, id)).limit(1);
  if (!row) {
    throw new ServiceError(404, "Record not found.");
  }
  return toRecord(row);
}

export async function createRecord(input: RecordInput): Promise<RecordItem> {
  const [row] = await db
    .insert(records)
    .values({
      id: `REC-${Date.now().toString(36).toUpperCase()}`,
      title: input.title,
      category: input.category,
      status: input.status,
      value: input.value
    })
    .returning();
  return toRecord(row);
}

export async function updateRecord(id: string, input: RecordPatch): Promise<RecordItem> {
  const current = await getRecord(id);
  const [row] = await db
    .update(records)
    .set({
      title: input.title ?? current.title,
      category: input.category ?? current.category,
      status: input.status ?? current.status,
      value: input.value ?? current.value,
      updatedAt: new Date()
    })
    .where(eq(records.id, id))
    .returning();
  return toRecord(row);
}
