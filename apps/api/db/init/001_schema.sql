-- Fresh-volume baseline. Docker runs this once when the Postgres data volume is empty.
-- Keep the statements in sync with apps/api/db/migrations/001_schema.sql.
-- Add later hackathon tables as apps/api/db/migrations/002_<name>.sql and run `pnpm db:migrate`.

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  company_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT users_role_check CHECK (role IN ('admin', 'manager', 'member'))
);

CREATE TABLE IF NOT EXISTS records (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  value NUMERIC(14, 2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT records_status_check CHECK (status IN ('active', 'pending', 'archived'))
);
