import { sql } from "drizzle-orm";
import { check, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const RECORD_STATUSES = ["active", "pending", "archived"] as const;
export type RecordStatus = (typeof RECORD_STATUSES)[number];

export const records = pgTable(
  "records",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    category: text("category").notNull(),
    status: text("status").notNull(),
    value: numeric("value", { precision: 14, scale: 2, mode: "number" }).notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [check("records_status_check", sql`${table.status} in ('active', 'pending', 'archived')`)]
);
