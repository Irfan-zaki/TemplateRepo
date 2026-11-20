# Testing steps

Run in this order. Fix failures before moving to the next layer.

## 1. Backend integration and acceptance

Do not edit the shared `apps/backend/test-backend-e2e.mjs` (hot file, merge conflicts). Create `apps/backend/tests/<feature>.e2e.mjs` by copying that file's header (imports, `assert` helper, `migrate()`, `runDatabaseSeed()`, `buildApp`, `app.inject`, results footer). Run:

```bash
docker compose up -d
pnpm --filter backend exec tsx tests/<feature>.e2e.mjs
pnpm test:backend    # the shared suite must still pass
```

Cover, with real Postgres and `app.inject` (no mocks):

| Layer | What to assert |
| :--- | :--- |
| Auth matrix | For every endpoint and every role in the contract: no token 401, forbidden role 403, allowed role 200/201. |
| Validation | Each required field missing, wrong type, out-of-range, and bad enum gives 400 with the Zod message. |
| Not found / conflict | Unknown id 404; duplicate or illegal state change 409 or the contract's code. |
| Integration | Create then read back then update then list; the row is in the DB (query via the service or a follow-up GET). Multi-table writes are atomic. |
| Business rules | Every calculation, status transition, and limit from the requirements, using values from the doc. |
| Acceptance | One numbered block per user story ID in Part A, titled with that ID (`US-3: Manager can approve ...`), written Given/When/Then. |

Test data created by the tests uses unique suffixes (`Date.now().toString(36)`) so reruns do not collide.

## 2. Frontend behaviour tests (Playwright)

Setup, only if `apps/frontend/playwright.config.ts` is not already on `origin/main`:

```bash
pnpm --filter frontend add -D @playwright/test
pnpm --filter frontend exec playwright install chromium
```

Config: `testDir: "./e2e"`, `use.baseURL: "http://localhost:5173"`, and a `webServer` running `pnpm dev` from the repo root with `reuseExistingServer: true`. The package.json and lockfile changes are shared: tell the developer to commit and merge them first.

Write `apps/frontend/e2e/<feature>.spec.ts`. Log in through the real login page using the demo accounts from `docs/SETUP.md`, via a small `e2e/helpers/auth.ts` helper (create if missing). Tests run against the real backend.

One test per user story, named with the story ID, driving the UI the way a user would (role/label selectors):

- Happy path for each role allowed to do it.
- Negative path: restricted role cannot see or use the action, and a direct API call returns 403.
- Validation: submitting an invalid form shows the server or client message and does not create a row.
- Persistence: perform the write, `page.reload()`, and assert the data is still there.

### States (required)

| State | How to test |
| :--- | :--- |
| Loading | Delay the list request with `page.route("**/api/<feature>*", ...)` then continue; assert `[data-testid="<feature>-skeleton"]` is visible, then gone when data arrives. |
| Empty | Prefer a real filter or search that matches nothing. If none exists, fulfil the request with an empty `data: []` inside the test via `page.route` (test-only interception, never app code), and assert `[data-testid="<feature>-empty"]` plus the create action for allowed roles. |
| Error | Fulfil with status 500; assert the danger alert shows the message and Retry refetches. |
| Forbidden | Log in as the restricted role; assert the message or hidden action. |

Run:

```bash
pnpm dev                       # real mode, in another terminal
pnpm --filter frontend exec playwright test e2e/<feature>.spec.ts
```

When a quick visual check is more useful than a spec (layout, spacing, tokens), use the Cursor browser tool: navigate, snapshot, screenshot each state, compare to DESIGN.md.

## 3. Real-mode verification (required by AGENTS.md)

1. `pnpm dev:real`. Do the full user flow by hand or through Playwright.
2. Refresh the browser. Records you created must still be there.
3. Confirm in the DB: `pnpm db:studio` or `docker compose exec postgres psql -U hackcore -d hackcore`.
4. Run `pnpm check:mock-leakage` and both `tsc --noEmit` checks.
5. If any dependency is still mocked, say so in the hand-off report and test that part with `pnpm dev:mock` separately.

## Report

Print a table: layer, command, pass/fail counts. Anything not run is listed as not run with the reason. Never report a layer as passing without running it.
