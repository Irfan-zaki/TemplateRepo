# Mock Inventory & API Migration Tracker

## Status Definitions

- `MOCK ONLY`: Endpoint is currently served only by an MSW handler in `apps/frontend/src/mocks/handlers/`.
- `REAL API IMPLEMENTED`: Fastify route exists and talks to PostgreSQL.
- `REAL API VERIFIED`: Checked against Fastify + PostgreSQL, including a reload or the API test suite.

## Active Inventory

| Feature | Mock endpoint | Real API | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Auth / Signup | `POST /api/auth/signup` | `POST /api/auth/signup` | `REAL API VERIFIED` | Persists a user and returns a JWT |
| Auth / Login | `POST /api/auth/login` | `POST /api/auth/login` | `REAL API VERIFIED` | Demo password is in `docs/SETUP.md` |
| Auth / Session | `GET /api/auth/me` | `GET /api/auth/me` | `REAL API VERIFIED` | Requires `Authorization: Bearer` |
| Records list | `GET /api/records` | `GET /api/records` | `REAL API VERIFIED` | Any signed-in role |
| Record detail | `GET /api/records/:id` | `GET /api/records/:id` | `REAL API VERIFIED` | Used by the edit dialog |
| Record create | `POST /api/records` | `POST /api/records` | `REAL API VERIFIED` | `admin` and `manager` only |
| Record update | `PATCH /api/records/:id` | `PATCH /api/records/:id` | `REAL API VERIFIED` | `admin` and `manager` only |

## When a real endpoint is done

1. Exercise it with `pnpm dev`.
2. Confirm the JSON matches the feature `types.ts` file.
3. Refresh the browser and confirm the row is still there.
4. Update this table.
5. Keep the MSW handler so `pnpm dev:mock` still works.
