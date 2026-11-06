# Mock Inventory & API Migration Tracker

**Responsible Owner:** Arsh (Maintained in coordination with feature owners)

## Status Definitions
- `MOCK ONLY`: Endpoint is currently served only by MSW mock handler in `apps/web/src/mocks/handlers/`.
- `REAL API IMPLEMENTED`: Backend Fastify endpoint is implemented and connected to database, undergoing testing.
- `REAL API VERIFIED`: Verified end-to-end against Fastify + PostgreSQL in `pnpm dev:real` mode with data persistence confirmed.

---

## Active Inventory

| Feature | Mock endpoint | Owner | Real API | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth / Signup** | `POST /api/auth/signup` | Starter Team | `POST /api/auth/signup` | `REAL API IMPLEMENTED` | Fixture: `auth.fixture.ts` |
| **Records Console** | `GET /api/records` | Starter Team | `GET /api/records` | `REAL API IMPLEMENTED` | Fixture: `records.fixture.ts` |

---

## Migration Checklist (When Real Endpoint is Completed)

When a real endpoint is ready, the feature owner must:
1. Test it using `pnpm dev:real`.
2. Verify its request and response contracts match `apps/web/src/types/api.ts`.
3. Confirm database changes persist across page reloads.
4. Update this inventory status (`REAL API IMPLEMENTED` -> `REAL API VERIFIED`).
5. Remove the mock handler if no longer required, or retain it purely for isolated UI development and automated tests.

