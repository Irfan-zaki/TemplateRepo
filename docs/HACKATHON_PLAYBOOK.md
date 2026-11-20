# Hackathon Playbook — Auth, Tests, DB, Team, Mocks

Student-friendly guide for running this template as a 3-dev team in ~8 hours.
How to install is in [SETUP.md](SETUP.md). Folder map is in [about.md](about.md).

> **Packages:** folder `apps/backend` → filter `backend`; folder `apps/frontend` → filter `frontend`.  
> Root scripts: `pnpm dev:backend`, `pnpm dev:frontend`, `pnpm test:backend`, `pnpm db:studio`.  
> Aliases `dev:api` / `dev:web` / `test:api` still work and call the new names.

---

## 0. Hackathon day runbook (read this first)

The order of the day: **one person imports the template, everyone clones that one repo, everyone gets a clean local database, the team agrees the schema and API on paper, one person lands the foundation on `main`, then three people build in parallel.**

Git background for the parallel part is in [TEAM-SYNC-GIT-GUIDE.md](TEAM-SYNC-GIT-GUIDE.md). The rules the AI skill follows are in `.cursor/skills/build-feature/TEAM-SYNC.md`.

### 0.1 Before the event (one-time, each person)

- [ ] Node 20+, pnpm 10+, Docker running. `pnpm install` works on your laptop.
- [ ] Clone this template once and run the [hand-practice checklist](#hand-practice-checklist-do-this-once-before-the-event) at the bottom.
- [ ] Cursor installed, with the `.cursor/skills/build-feature` skill present (it ships inside the repo).
- [ ] Agree who the **lead** is. The lead owns the repo, the schema, and the foundation commit.
- [ ] Check the hackathon rules about starter code (see the note in 0.2).

### 0.2 Hour 0: the lead creates the project repo

**Only the lead does this. Teammates do not clone the template.** If three people each clone the template, change `origin`, and push, you get three repos or three unrelated histories. Git then refuses to merge them (`refusing to merge unrelated histories`). One repo, three clones of it.

1. On GitHub, create an **empty** repo for the event (no README, no `.gitignore`, no licence). Add both teammates as collaborators.
2. Import the template into it:

```bash
git clone --depth 1 https://github.com/Irfan-zaki/TemplateRepo.git my-hackathon-app
cd my-hackathon-app
rm -rf .git                      # drop the template's history
git init -b main
git add .
git commit -m "chore: import HackCore starter template"
git remote add origin https://github.com/<you-or-org>/<new-repo>.git
git push -u origin main
```

3. Tell teammates the new URL. They run `git clone <new-repo-url>` and nothing else.

**Is the template visible to the organisers?** Assume yes. Changing `origin` alone keeps every old commit, with their old dates and author names, so anyone looking at the history sees work from before the event. A fresh `git init` removes that history, but the code is still a known starter, and `package.json`, the folder layout, and the docs still look like one. Do not rely on it being unnoticed.

- Read the rules. If they say "all code must be written during the event," do not use the template.
- If starter kits and boilerplate are allowed, say so at the demo: "we started from our own boilerplate for auth, the database setup, and the UI kit, and built the features during the event." The commit message above already says that.
- Judges mostly care about the features you built in the 8 or 24 hours. Your commit history from that day shows that clearly.

### 0.3 Hour 0: everyone gets a clean local database

Everybody runs their own Postgres in Docker. The databases are **not** shared. What keeps them identical is the **migration files in git** (`apps/backend/drizzle/`), not Docker. If a table is missing on your machine, you did not run `pnpm db:migrate` after pulling.

#### Why you saw old tables in Drizzle Studio

One of these, almost always:

| Cause | How to check |
| :--- | :--- |
| The **Docker volume survived**. Docker names it after the folder (`<folder>_hackcore_pg`). A new clone in a folder with the same name reuses the old data. | `docker volume ls` |
| The **old container is still running** on port `5435`, so the new project connects to the old database. | `docker ps` |
| `apps/backend/.env` points at a different database than the one you think. Drizzle Studio reads `DATABASE_URL` from there. | `cat apps/backend/.env` |

#### Clean start (each person, in their own clone)

```bash
docker ps                          # anything old on 5435? stop it
docker compose down -v             # stop this project and delete its volume (wipes data)
docker compose up -d
cp apps/backend/.env.example apps/backend/.env    # once. Never commit .env
pnpm db:migrate
pnpm db:seed
pnpm db:studio                     # should show only this project's tables
```

If you cannot remove the old container, wipe the tables in place:

```bash
docker compose exec postgres psql -U hackcore -d hackcore -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; DROP SCHEMA IF EXISTS drizzle CASCADE;"
pnpm db:migrate && pnpm db:seed
```

The `drizzle` schema holds the record of which migrations ran. If you drop only `public`, Drizzle thinks the tables still exist and skips creating them. Drop both.

**Make the project's Docker names unique (lead, in the foundation commit).** At the top of `docker-compose.yml` add `name: <your-project>` (for example `name: dealflow`). The volume becomes `dealflow_hackcore_pg`, so it can never collide with an older project's volume. If teammates run other projects on port `5435`, change the left side of the port mapping and `DATABASE_URL` in `.env.example` together.

### 0.4 Hour 0 to 0:45: kickoff, agree the contract on paper

Do this together, before any feature code. Nobody builds until the contract is committed.

1. Read the problem statement together. Pick **one happy path** and cut everything else.
2. Put these files in the repo (the lead commits them straight to `main`):

| File | Content |
| :--- | :--- |
| `docs/problem/statement.pdf` or `statement.md` | The brief, unchanged. |
| `docs/problem/<name>.excalidraw` | The wireframe board. The skill can read it with `scripts/excalidraw-to-text.mjs`. |
| `docs/CONTRACT.md` | The one agreed document, template below. |

3. Fill `docs/CONTRACT.md`. This is the part that prevents integration pain later:

```markdown
# Contract (agreed <date>, changes need all three people)

## Roles
admin, manager, member, ... (and what each may do in one line)

## Feature owners
| Feature | Owner | Branch | Tables it owns |
| :--- | :--- | :--- | :--- |
| quotations | Dev B | feat/quotations | quotations, quotation_items |
| approvals  | Dev C | feat/approvals  | approvals |
| schema + auth + shared | Lead | (main) | users, roles, foundation |

## Tables
One block per table: columns, types, nullable, defaults, foreign keys, enums/status values.

## Endpoints
| Method | Path | Roles | Request body | Response | Owner |
| :--- | :--- | :--- | :--- | :--- | :--- |
| GET | /api/quotations | any | none | { items: Quotation[] } | Dev B |
| POST | /api/quotations/:id/approve | manager | none | Quotation | Dev C |

## Cross-feature dependencies
"Approvals reads quotations.status and total." Producer merges first.

## Order of merges
Foundation, then producers, then consumers.
```

4. Keep it short and exact. Field names, status strings, and error shapes are where integration breaks. Each feature's own `docs/features/<feature>.md` Part A (created by the `build-feature` skill) will copy its slice from this file.

### 0.5 Hour 0:45 to 1:30: the foundation commit (lead only)

The foundation is everything three people would otherwise edit at the same time. One person does it once, and it reaches `main` **before** any feature branch starts.

1. Create all the agreed tables in `apps/backend/src/db/schema/*.ts` and export them from `schema/index.ts`. Update `USER_ROLES` if the brief has new roles.
2. Decide what to do with the sample `records` feature. Either keep it as a copy-paste reference until the end of the day, or delete it with its tests.
3. **Regenerate the migration from scratch, once.** Nobody has data yet, so a clean history is safe:

```bash
rm -rf apps/backend/drizzle              # old 0000_init.sql + meta/
pnpm db:generate                         # new 0000_*.sql for the agreed schema
docker compose down -v && docker compose up -d
pnpm db:migrate && pnpm db:seed
pnpm db:studio                           # check the tables match CONTRACT.md
```

4. Rewrite the seed in `apps/backend/src/db/seeds/` so it tells the story of the brief (users per role, a few rows per table). Seed data is legitimate database data and stays.
5. **Pre-wire the hot files** so nobody edits them in parallel. Add empty stubs for all three features in:
   - `apps/backend/src/app.ts` (one `register` line each)
   - `apps/frontend/src/app/feature-registry.tsx` (one object each)
   - `apps/frontend/src/mocks/handlers/index.ts` (one spread each)

   Each stub points at a file the owner will fill in. After this, owners edit only their own folder.
6. Commit in small pieces and push to `main`:

```bash
git add docs/ && git commit -m "docs: problem statement, board, contract"
git add apps/backend/src/db apps/backend/drizzle && git commit -m "feat(db): agreed schema, migration, seed"
git add -A && git commit -m "chore: pre-wire feature stubs, unique docker name"
git push origin main
```

7. Tell teammates: "Foundation is on main."

### 0.6 Hour 1:30: teammates sync and fan out

Each teammate, in their own clone:

```bash
git pull origin main
docker compose down -v && docker compose up -d     # fresh DB
pnpm install
cp apps/backend/.env.example apps/backend/.env
pnpm db:migrate && pnpm db:seed
pnpm db:studio                                     # same tables as the lead
git switch -c feat/<your-feature>
```

Check before moving on: all three people see **the same tables** in Drizzle Studio. If not, stop and fix it now.

Then each person starts the `build-feature` skill in Cursor with their feature name. The skill reads `docs/CONTRACT.md`, the board, and the problem statement.

### 0.7 During the build: the rules that matter

Full detail is in `.cursor/skills/build-feature/TEAM-SYNC.md` and [TEAM-SYNC-GIT-GUIDE.md](TEAM-SYNC-GIT-GUIDE.md). In short:

- **Schema changes go through the lead.** Never run `pnpm db:generate` on your own branch for a shared table. Two people generating migrations at once produce two files with the same number and a conflicting `_journal.json`. If you need a new column, message the lead. The lead adds it, generates the migration, pushes to `main`, and announces it. Everyone then runs `git pull --rebase origin main && pnpm db:migrate`.
- **Never use `drizzle-kit push`** in the team flow. It changes your local database without writing a migration, so your database drifts away from everyone else's and nothing in git shows it.
- **Rebase on `main` every 30 to 45 minutes** and after any announcement: `git pull --rebase origin main`.
- **After every pull, run `pnpm db:migrate`.** A teammate's new table only exists on your machine after this.
- **Merge small and early.** As soon as your feature's own tests pass in `pnpm dev:real`, merge. Producers before consumers.
- **Contract changes are announced.** Edit `docs/CONTRACT.md`, push it to `main`, tell the team, and consumers update their mocks.
- **Never commit `.env`. Never force-push `main`.**
- **Depending on a teammate's unmerged feature:** build against the contract using an MSW mock, then swap to the real endpoint when it lands on `main`.

If your local database gets confused at any point, wipe it and rebuild. It takes under a minute:

```bash
docker compose down -v && docker compose up -d && pnpm db:migrate && pnpm db:seed
```

### 0.8 Last hour: integration

- Everyone is on `main`, rebased, with `pnpm db:migrate` run.
- Run the full happy path in `pnpm dev:real` as each role. Hard refresh after each write.
- `docs/MOCK_INVENTORY.md` has no `MOCK ONLY` rows left.
- `pnpm test:backend` and `pnpm check:mock-leakage` pass.
- Freeze features. Fix bugs only. Practise the demo.

### 0.9 Message to paste to teammates (the night before)

> Tomorrow: **I (lead) create the repo and push the starter. Do not clone the template. Clone my repo when I send the link.**
> Tonight: install Node 20+, pnpm 10+, Docker, Cursor. Run `pnpm install` on any old clone to be sure it works.
> Tomorrow, once we have the brief: 45 minutes together to agree tables, endpoints, and who owns which feature. I commit that as `docs/CONTRACT.md`. After the foundation is on `main`, you each `git pull`, wipe your Docker DB, migrate, and branch `feat/<your-feature>`.
> Rules: only touch your own feature folders. Ask me before changing a shared table. Rebase on `main` often. Run `pnpm db:migrate` after every pull. Never commit `.env`.

---

## 1. How auth and role-based access control (RBAC) work

### Plain-English story

1. User signs up or logs in.
2. Backend checks email + password against Postgres.
3. Backend creates a **JWT** (a signed ticket) that contains `userId`, `email`, and `role`.
4. Frontend stores that ticket in `localStorage` as `hackcore.token`.
5. Every later API call sends `Authorization: Bearer <token>`.
6. Protected routes call `requireAuth` or `requireRole(...)` before the handler runs.
7. Wrong/missing token → **401**. Valid token but wrong role → **403**.

RBAC here means: **the role is inside the JWT**, and each route lists who is allowed.

### Roles in this template

Defined in `apps/backend/src/db/schema/users.ts`:

| Role | Typical power in the sample Records feature |
| :--- | :--- |
| `admin` | Read + create + update |
| `manager` | Read + create + update |
| `member` | Read only (create/update blocked) |

Demo password (from seed): `hackathon` — see [SETUP.md](SETUP.md).

### Where each piece lives

| Layer | File | Job |
| :--- | :--- | :--- |
| Password + DB | `apps/backend/src/features/auth/service.ts` | bcrypt hash/compare, insert/find user |
| Request shape | `apps/backend/src/features/auth/schema.ts` | Zod for signup/login body |
| HTTP + JWT issue | `apps/backend/src/features/auth/routes.ts` | `/api/auth/signup`, `/login`, `/me` |
| Gatekeepers | `apps/backend/src/plugins/auth.ts` | `requireAuth`, `requireRole` |
| Token on wire | `apps/frontend/src/lib/api-client.ts` | saves token, adds Bearer header |
| Session in UI | `apps/frontend/src/app/AuthProvider.tsx` | login, logout, restore via `/me` |
| Screen gate | `apps/frontend/src/app/App.tsx` | `RequireAuth` + `FeatureGate` |
| Nav roles | `apps/frontend/src/app/feature-registry.tsx` | which roles see which menu item |
| Button hide | e.g. Records page `canWrite` | hide "New record" for members |

### Backend gate example (Records)

```ts
// Anyone logged in can list
app.get("/api/records", { preHandler: requireAuth }, ...)

// Only admin or manager can create
app.post("/api/records", { preHandler: requireRole("admin", "manager") }, ...)
```

Frontend hiding a button is **UX only**. Real security is always `requireRole` on the API.

### Request flow (login → protected action)

```text
Browser LoginPage
  → POST /api/auth/login
  → service.login (bcrypt)
  → jwtSign({ sub, email, role })
  → AuthProvider stores token + user
  → later: GET /api/records with Bearer token
  → requireAuth / requireRole
  → service + Drizzle + Postgres
```

### Try it yourself (5 minutes)

1. `pnpm dev` (Postgres up, `.env` present, migrate + seed done).
2. Log in as `member@starter.dev` / `hackathon`.
3. Confirm "New record" is hidden.
4. Log in as `admin@starter.dev` / `hackathon` and create a row.
5. Refresh the browser — the row must still be there (real mode).

---

## 1b. Add “Forgot password” the easy hackathon way

There is **no email provider** in this template. For an 8-hour event, do **not** build SMTP.
Use a **reset code** that you show in the API response (or log to the terminal) for the demo.

### Minimal design (recommended)

| Step | Endpoint | What it does |
| :--- | :--- | :--- |
| 1 | `POST /api/auth/forgot-password` | Body: `{ email }`. Creates a short random code, stores hash + expiry on the user (or a small `password_resets` table). Returns `{ success: true, resetCode }` in **dev/demo** so judges can continue without email. |
| 2 | `POST /api/auth/reset-password` | Body: `{ email, resetCode, newPassword }`. Verifies code, bcrypt-hashes new password, clears the code. |

### Files to touch (copy the auth feature pattern)

1. `apps/backend/src/db/schema/users.ts` — add optional columns, e.g. `resetCodeHash`, `resetCodeExpiresAt`  
   **or** add `password_resets` table.
2. `pnpm db:generate` then `pnpm db:migrate`
3. `apps/backend/src/features/auth/schema.ts` — Zod for both bodies
4. `apps/backend/src/features/auth/service.ts` — `requestPasswordReset`, `resetPassword`
5. `apps/backend/src/features/auth/routes.ts` — two public routes (no `requireAuth`)
6. Frontend: `ForgotPasswordPage` + `ResetPasswordPage` under `features/auth/`, routes in `App.tsx`
7. Mock mode: handlers in `apps/frontend/src/mocks/handlers/auth.handlers.ts` + update [MOCK_INVENTORY.md](MOCK_INVENTORY.md)

### Security notes for judges (say this out loud)

- Real products email the code and never return it in JSON.
- For the hackathon demo, returning the code is intentional so the flow is completable offline.
- Always hash the stored code; never store the raw code if you can avoid it.
- Expire codes quickly (e.g. 15 minutes).

### Even faster (if the brief barely cares)

Admin-only: `POST /api/auth/admin-set-password` with `requireRole("admin")` and `{ email, newPassword }`.  
Useful for support stories; weaker as a “forgot password” UX.

---

## 2. Where tests are, and how to do user-story / behaviour testing

### What exists today

| Kind | Location | How to run |
| :--- | :--- | :--- |
| Backend behaviour / e2e API tests | `apps/backend/test-backend-e2e.mjs` | `pnpm test:backend` (needs Postgres + `DATABASE_URL`) |
| Frontend unit/UI tests | **none yet** | add later if time |
| Mock leakage check | `scripts/check-mock-leakage.mjs` | `pnpm check:mock-leakage` |

There is **no** `*.test.ts` / Vitest suite yet. The backend “test file” is one script that boots Fastify in-process with `app.inject()` (no browser).

### What that e2e script already proves (user behaviours)

Open `apps/backend/test-backend-e2e.mjs`. It already reads like acceptance checks:

- Health works
- Records without token → 401
- Admin can login and call `/me`
- Seed records exist
- Signup works; duplicate email → 409
- Bad password → 401
- **Member cannot create a record → 403**
- Admin can create / read / update

That is behaviour testing: **Given** a role, **When** they call an endpoint, **Then** status/body match the story.

### Turn a hackathon requirement into a test (recipe)

1. Write the user story in one line:

   > As a **member**, I cannot **approve** a quotation.

2. Add a numbered block in `test-backend-e2e.mjs` (copy an existing block):

   - login as that role
   - `app.inject` the action
   - `assert(statusCode === 403, "...", state)`

3. Implement the route/service until the test passes.
4. Only then polish the UI.

### Suggested story checklist for your product

Keep a short `docs/ACCEPTANCE.md` (or a Notion/board card) with rows like:

| ID | Story | API check | UI check | Done |
| :--- | :--- | :--- | :--- | :--- |
| US-1 | Member can list X | GET 200 as member | table visible | ☐ |
| US-2 | Member cannot create X | POST 403 as member | button hidden | ☐ |
| US-3 | Manager can approve X | POST .../approve 200 | status badge updates | ☐ |
| US-4 | Refresh keeps data | create → refresh → still there | real mode only | ☐ |

In an 8-hour hackathon: **API asserts in `test-backend-e2e.mjs` + manual UI click-through** is enough. Do not spend the first hour choosing a fancy test framework.

### Manual behaviour script (before demo)

1. Login each role once.
2. Happy path end-to-end on real mode.
3. Negative path: member tries forbidden action.
4. Hard refresh after create/update.
5. `pnpm test:backend` once before you present.

---

## 3. How to see PostgreSQL records and Drizzle Studio

### Option A — Drizzle Studio (best for students)

```bash
pnpm db:studio
```

Same thing via the filter:

```bash
pnpm --filter backend exec drizzle-kit studio
```

- Needs `apps/backend/.env` with `DATABASE_URL` (copy from `.env.example`).
- Needs Postgres running: `docker compose up -d`.
- Opens a local URL (Drizzle prints it; usually something like `https://local.drizzle.studio`).
- You can browse tables (`users`, `records`, …) and edit rows carefully.

`drizzle.config.ts` already points at your schema and `DATABASE_URL` (default host port **5435**).

### Option B — `psql` in the container

```bash
docker compose exec postgres psql -U hackcore -d hackcore
```

Useful SQL:

```sql
\dt
SELECT id, email, role FROM users;
SELECT id, title, status, value FROM records;
```

Exit with `\q`.

### Option C — GUI client (DBeaver, TablePlus, pgAdmin)

Connect with:

| Field | Value |
| :--- | :--- |
| Host | `localhost` |
| Port | `5435` |
| User | `hackcore` |
| Password | `hackcore` |
| Database | `hackcore` |

### Useful DB commands (root)

| Command | Meaning |
| :--- | :--- |
| `pnpm db:generate` | After you change Drizzle schema files, write a migration |
| `pnpm db:migrate` | Apply migrations to Postgres |
| `pnpm db:seed` | Insert demo users/records |
| `pnpm db:studio` | Open Drizzle Studio |
| `docker compose down -v` | **Wipes** the database volume — then migrate + seed again |

---

## 4. Three-dev team: avoid cross-commits + Agile in 8 hours

### Why people step on each other

Shared hot files:

- `apps/backend/src/app.ts` (register routes)
- `apps/backend/src/db/schema/index.ts`
- `apps/frontend/src/app/feature-registry.tsx`
- `apps/frontend/src/app/App.tsx`
- `apps/frontend/src/mocks/handlers/index.ts`

**Rule:** one owner per shared file per sprint, or merge those edits last, one at a time.

### Split work by folders (ownership map)

| Dev | Owns | Does not touch unless asked |
| :--- | :--- | :--- |
| **Dev A — Data + Auth/API core** | `db/schema/*`, migrations, seeds, `features/auth`, shared plugins | other people’s feature UI |
| **Dev B — Feature API #1** | `features/<brief-feature-1>/` only | schema owned by A until tables agreed |
| **Dev C — Feature UI #1 (+ #2 if time)** | `features/<...>/` pages/hooks + registry **entry for their screen** | backend schema |

If you only have three people and two product features: A = schema + auth extras, B = backend feature, C = frontend (mock first, then wire real).

### Git habits that prevent pain

1. **One branch per person/feature:** `feat/quotes-api`, `feat/quotes-ui`, `feat/forgot-password`.
2. **Pull / rebase often** (every 30–45 min): `git pull --rebase origin main` (or your main branch).
3. **Small commits** that only touch your folder.
4. **Do not** force-push shared main.
5. Before you edit a shared file, shout in chat: “taking `feature-registry` for 5 min.”
6. Prefer **append-only** edits in shared lists (add one route object, add one `app.register`).

### Conflict emergency kit

```bash
git status
git pull --rebase
# fix conflicts in your editor
git add .
git rebase --continue
```

If rebase is scary mid-event: merge instead, but still keep branches short-lived.

---

### Agile for an 8-hour hackathon (3–4 mini-sprints)

Treat “sprints” as **timeboxes with a demo**, not ceremony.

| Sprint | Clock | Goal | Exit criteria |
| :--- | :--- | :--- | :--- |
| **0 — Kickoff** | 0:00–0:45 | Read brief, pick 1 happy path, assign owners, sketch tables + roles | Board with stories US-1…US-n; schema sketch agreed |
| **1 — Skeleton** | 0:45–2:30 | Tables migrate; empty list page; login still works; MSW stubs if needed | `pnpm db:migrate` OK; nav item visible; mock or real list loads |
| **2 — Core write path** | 2:30–4:30 | Create + status change with `requireRole`; seed tells a story | Member blocked; manager/admin succeeds; refresh keeps data |
| **3 — Polish + tests** | 4:30–6:30 | Edge cases, forgot-password *if required*, e2e asserts, DESIGN.md | `pnpm test:backend` green; acceptance checklist mostly checked |
| **4 — Demo freeze** | 6:30–8:00 | Fix only bugs; seed demo script; practice 3-minute talk | Real mode only; no new features |

Standups: **3 minutes every sprint boundary** — “done / next / blocked.”

### Definition of Done (hackathon version)

A story is done only when:

1. Fastify route + Postgres (not only MSW)
2. `requireAuth` / `requireRole` correct
3. UI uses `api-client` (no hardcoded rows)
4. Works after refresh in `pnpm dev`
5. Row added to [MOCK_INVENTORY.md](MOCK_INVENTORY.md) if a mock exists
6. At least one assert in `test-backend-e2e.mjs` **or** a checked manual acceptance row

### What “Agile” buys you here

- You ship a **vertical slice** every sprint (API + UI + role check), not “all backend then all frontend.”
- Testing is continuous: each sprint ends with a click-through + growing e2e script.
- Scope cut is planned: if Sprint 2 slips, Sprint 3 drops polish features, not the happy path.

---

## 5. How mock data is handled

### The rule in one sentence

**Fake business data lives only under `apps/frontend/src/mocks/`.** Pages always call `apiClient`. Real mode never falls back to fixtures when the API fails.

Full rules: [AGENTS.md](../AGENTS.md). Tracker: [MOCK_INVENTORY.md](MOCK_INVENTORY.md).

### Two modes

| Command | Who answers `/api/...` |
| :--- | :--- |
| `pnpm dev` / `pnpm dev:real` | Fastify + Postgres |
| `pnpm dev:mock` | MSW in the browser |

Mock mode starts in `apps/frontend/src/app/main.tsx` when `VITE_API_MODE=mock` (and only in DEV).

### File layout

```text
apps/frontend/src/mocks/
├── browser.ts              starts the worker
├── session-store.ts        fake users + tokens (mirrors login)
├── fixtures/               sample JSON (auth, records, ...)
└── handlers/
    ├── index.ts            export all handlers
    ├── auth.handlers.ts
    └── records.handlers.ts
```

### How a mock request works

```text
Page → apiClient.get("/records")
     → browser fetch /api/records
     → MSW handler matches
     → fixture / in-memory store JSON
     → page renders (same shape as real API)
```

Handlers should mirror roles (e.g. member create → 403) so UI can be built before the API exists.

### When to use mocks in the team

- Dev C builds UI in Sprint 1 while Dev A/B finish schema/routes.
- Keep handler + fixture + inventory row in sync.
- **Demo and Definition of Done use real mode.** Judges refresh; data must persist.

### Anti-patterns (will hurt you)

```ts
// BAD — fake fallback
const rows = apiData || mockRows;

// BAD — hardcoded in the page
const [employees] = useState([{ id: 1, name: "John" }]);

// BAD — fake success with setTimeout instead of MSW
setTimeout(() => setSaved(true), 500);
```

---

## Quick “day of” cheat sheet

```bash
pnpm install
docker compose up -d
cp apps/backend/.env.example apps/backend/.env   # once
pnpm db:migrate && pnpm db:seed
pnpm dev                                         # real mode for demo
pnpm test:backend                                # API behaviours
pnpm db:studio                                   # browse DB
pnpm dev:mock                                    # UI-only while API unfinished
```

### Demo accounts

Password: `hackathon`

- `admin@starter.dev` — admin  
- `manager@starter.dev` — manager  
- `member@starter.dev` — member  

### Related docs

| Doc | Use |
| :--- | :--- |
| [SETUP.md](SETUP.md) | Install and run |
| [about.md](about.md) | Architecture map |
| [MOCK_INVENTORY.md](MOCK_INVENTORY.md) | Real vs mock endpoints |
| [AGENTS.md](../AGENTS.md) | Mock hygiene rules |
| `apps/frontend/DESIGN.md` | UI colors / no gradients |

---

## Hand-practice checklist (do this once before the event)

- [ ] Start Postgres, migrate, seed, `pnpm dev`, login as all three roles
- [ ] Create a record as manager; confirm member gets 403 via e2e or Network tab
- [ ] Open Drizzle Studio and find your user row
- [ ] Run `pnpm test:backend` and read each PASS line
- [ ] Run `pnpm dev:mock`, login, confirm the mock banner appears
- [ ] Skim `features/records` on backend + frontend — that folder is your copy-paste template
- [ ] Agree with teammates who owns schema, who owns which feature folder, who merges shared files
