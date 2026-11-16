# HackCore

Starter for a 24-hour hackathon. React and Vite on the frontend, Fastify and PostgreSQL on the backend. Feature folders stay independent so three or four people can split screens after the schema and routes exist.

The runbook is [docs/SETUP.md](docs/SETUP.md). How the folders fit together, plugins vs features, mock handlers, and hackathon tips are in [docs/about.md](docs/about.md). Auth/RBAC, tests, Drizzle Studio, team Agile, and mocks are in [docs/HACKATHON_PLAYBOOK.md](docs/HACKATHON_PLAYBOOK.md). Design tokens live in [apps/frontend/DESIGN.md](apps/frontend/DESIGN.md). Mock rules live in [AGENTS.md](AGENTS.md).

```
apps/backend/src/db/schema/<feature>.ts       Drizzle tables
apps/backend/src/features/<feature>/          routes.ts, service.ts, schema.ts
apps/backend/src/plugins/                     shared server pieces (JWT, database, errors)
apps/frontend/src/app/feature-registry.tsx    one object per screen
apps/frontend/src/features/<feature>/         pages, hooks, api, types
apps/frontend/src/mocks/                      MSW handlers, only when VITE_API_MODE=mock
```

| Command | What it does |
| :--- | :--- |
| `pnpm dev` | Backend on port 3000 and frontend on port 5173, real Postgres |
| `pnpm dev:mock` | Frontend only, MSW intercepts `/api` |
| `pnpm db:generate` | Write a Drizzle migration after you change a table |
| `pnpm db:migrate` | Apply Drizzle migrations to Postgres |
| `pnpm db:seed` | Insert demo users and starter records |
| `pnpm db:studio` | Open Drizzle Studio against local Postgres |
| `pnpm test:backend` | Backend checks against the running Postgres |
| `pnpm check:mock-leakage` | Fail if business records are hardcoded outside `mocks/` |
