# Run HackCore locally

Needs Node 20+, pnpm 10+, and Docker.

```bash
pnpm install
docker compose up -d
cp apps/api/.env.example apps/api/.env
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Open http://localhost:5173. The API listens on port 3000. Vite proxies `/api` to it. Postgres is published on host port **5435** so it does not collide with a Postgres already listening on 5432. Inside Docker the database still listens on 5432. If 5435 is taken, change the left side of the port mapping in `docker-compose.yml` and the port in `apps/api/.env` together.

If port 3000 is already taken, pick another API port and point Vite at it:

```bash
PORT=3010 pnpm dev:api
API_PROXY_TARGET=http://localhost:3010 pnpm dev:web
```

`pnpm dev:mock` starts the web app alone. MSW serves the same paths so UI work can start before a route exists. Real mode never substitutes fixture data when a request fails.

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

1. Add `apps/api/db/migrations/002_<brief>.sql` and run `pnpm db:migrate`.
2. Add `apps/api/src/routes/<feature>.ts` with Zod and `requireRole(...)`. Register it in [apps/api/src/app.ts](../apps/api/src/app.ts).
3. Each person adds one object to [apps/web/src/app/feature-registry.tsx](../apps/web/src/app/feature-registry.tsx) and a folder under `apps/web/src/features/<feature>/`.
4. If the UI is ahead of the API, add a handler in `apps/web/src/mocks/handlers/` and list it in [docs/MOCK_INVENTORY.md](MOCK_INVENTORY.md).
5. Demo with `pnpm dev` so a refresh still shows the data.

Roles on the template are `admin`, `manager`, and `member`. A quotation brief can add `senior_manager`, `sales_rep`, or `customer` by widening the `users_role_check` constraint in a new migration and passing those names to `requireRole`.

Copy the records feature for create and edit: `GET /api/records`, `GET /api/records/:id`, `POST /api/records`, `PATCH /api/records/:id`.

## Judge demo image

Day to day, only Postgres runs in Docker. To boot the API in a container as well:

```bash
docker compose --profile demo up --build
```

That image runs migrations, seed, then the API. The web app still runs with `pnpm dev:web`.
