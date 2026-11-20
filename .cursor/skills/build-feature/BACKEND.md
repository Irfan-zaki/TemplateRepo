# Backend steps

Pattern source: `apps/backend/src/features/records/` (copy its structure and error handling). Tables live in `apps/backend/src/db/schema/<feature>.ts` and are exported from `db/schema/index.ts`; they should already exist (preflight step 3).

## 1. `features/<feature>/schema.ts` (Zod)

- One schema per request body, params, and query string. Use the exact field names from the contract in Part A of the feature doc.
- Reuse constants such as `RECORD_STATUSES`-style enums exported from the DB schema file. Never retype enum values.
- Partial update schema uses `.partial().refine(...)` like `recordPatchSchema`.
- Trim strings, give every rule a human-readable message (the first issue message is returned to the UI).
- Export `z.infer` types.

## 2. `features/<feature>/service.ts`

- All Drizzle queries and business rules live here. No Fastify types.
- A mapper (`toX`) converts DB rows to the API shape: dates to ISO strings, numerics to numbers.
- Throw `ServiceError(statusCode, message)` for 404, 409 (conflict), and 422-style rule violations such as an illegal status transition.
- Multi-step writes (e.g. create header and lines, state change and audit row) go in one `db.transaction`.
- IDs follow the existing prefix pattern (`REC-...`); check the plan, do not invent a new scheme.
- Cross-feature reads: import the other feature's service only if it is already merged. Otherwise query by its table through `db/schema`, or ask the developer.

## 3. `features/<feature>/routes.ts`

- Export `<feature>Routes(app: FastifyInstance)`.
- Every route has a `preHandler`: `requireAuth`, or `requireRole(...)` taken from the role rules in the feature doc. Frontend hiding is UX only.
- Validate with `parseOrReply`; catch `ServiceError` with a local `sendKnownError`, exactly like records.
- Response envelope: `{ success: true, data, message? }`; errors `{ success: false, message }`. Create returns 201.
- Path style `/api/<feature>` and `/api/<feature>/:id`. Actions are `POST /api/<feature>/:id/<action>`.

## 4. Register

Add one import and one `await app.register(<feature>Routes)` line to `apps/backend/src/app.ts` (append-only; see TEAM-SYNC.md).

## 5. Verify before moving on

```bash
pnpm --filter backend exec tsc --noEmit
pnpm dev:backend   # then hit each endpoint with the three demo roles
```

Confirm each role/endpoint pair from the contract returns the expected 200/201/401/403/404. Roles and demo logins are in `docs/SETUP.md`.

If the feature needs a new role or table column that is not in the plan, stop and ask: `USER_ROLES` and `users` are shared.
