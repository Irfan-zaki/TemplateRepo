# Run HackCore locally

Needs Node 20+, pnpm 10+, and Docker.

For auth/RBAC, tests, Drizzle Studio, team workflow, and mocks, read [HACKATHON_PLAYBOOK.md](HACKATHON_PLAYBOOK.md).

**On the day of the event, follow [HACKATHON_PLAYBOOK.md section 0](HACKATHON_PLAYBOOK.md#0-hackathon-day-runbook-read-this-first).** In short: the lead imports this template into a new repo and pushes it. Teammates clone that new repo, not the template. Everyone wipes their local Docker database (`docker compose down -v`) and runs `pnpm db:migrate`. The team agrees tables and endpoints in `docs/CONTRACT.md`, the lead lands the schema on `main`, and then each person branches `feat/<feature>`.

```bash
pnpm install
docker compose up -d
cp apps/backend/.env.example apps/backend/.env
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Open http://localhost:5173. The backend listens on port 3000. Vite proxies `/api` to it. Postgres is published on host port **5435** so it does not collide with a Postgres already listening on 5432. Inside Docker the database still listens on 5432. If 5435 is taken, change the left side of the port mapping in `docker-compose.yml` and the port in `apps/backend/.env` together.

If port 3000 is already taken, pick another backend port and point Vite at it:

```bash
PORT=3010 pnpm dev:backend
API_PROXY_TARGET=http://localhost:3010 pnpm dev:frontend
```

`pnpm dev:mock` starts the frontend alone. MSW serves the same paths so UI work can start before a route exists. Real mode never substitutes fixture data when a request fails.

Workspace package filters: `pnpm --filter backend …` and `pnpm --filter frontend …`.

## Demo logins

Shared password: `hackathon`

| Email | Role | Can edit records |
| :--- | :--- | :--- |
| admin@starter.dev | admin | yes |
| manager@starter.dev | manager | yes |
| member@starter.dev | member | no |

Sign-up creates another user in Postgres. A refresh keeps that user.

Reset the database:

```bash
docker compose down -v
docker compose up -d
pnpm db:migrate && pnpm db:seed
```

`down -v` deletes the volume. Do that only when you want a clean database.

## During the hackathon

1. Add the table in `apps/backend/src/db/schema/<feature>.ts` and export it from `apps/backend/src/db/schema/index.ts`.
2. Run `pnpm db:generate` then `pnpm db:migrate`.
3. Add a folder `apps/backend/src/features/<feature>/` with three files:
   - `schema.ts` — Zod checks for the request body
   - `service.ts` — the business rules and Drizzle queries
   - `routes.ts` — the HTTP paths, `requireAuth` / `requireRole`, and the JSON response
4. Register the route function in [apps/backend/src/app.ts](../apps/backend/src/app.ts). Copy `features/records`.
5. Each person adds one object to [apps/frontend/src/app/feature-registry.tsx](../apps/frontend/src/app/feature-registry.tsx) and a folder under `apps/frontend/src/features/<feature>/`.
6. If the UI is ahead of the backend, add a handler in `apps/frontend/src/mocks/handlers/` and list it in [docs/MOCK_INVENTORY.md](MOCK_INVENTORY.md).
7. Demo with `pnpm dev` so a refresh still shows the data.

`plugins/` is not where features go. A Fastify plugin is shared machinery (the JWT checker, the database connection). Signup and login are the auth feature.

Roles on the template are `admin`, `manager`, and `member`. A quotation brief can add `senior_manager`, `sales_rep`, or `customer` by updating `USER_ROLES` and the check on the users table, then generating a new migration.

## Judge demo image

Day to day, only Postgres runs in Docker. To boot the backend in a container as well:

```bash
docker compose --profile demo up --build
```

That image runs migrations, seed, then the backend. The frontend still runs with `pnpm dev:frontend`.
