import { sql } from "drizzle-orm";
import { check, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const USER_ROLES = ["admin", "manager", "member"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    name: text("name").notNull(),
    companyName: text("company_name").notNull().default(""),
    role: text("role").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [check("users_role_check", sql`${table.role} in ('admin', 'manager', 'member')`)]
);
