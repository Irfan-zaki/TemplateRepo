# HackCore

Starter for a 24-hour hackathon. React and Vite on the web, Fastify and PostgreSQL on the API. Feature folders stay independent so three or four people can split screens after the schema and routes exist.

The runbook is [docs/SETUP.md](docs/SETUP.md). How the folders fit together, plugins vs features, mock handlers, and hackathon tips are in [docs/about.md](docs/about.md). Design tokens live in [apps/web/DESIGN.md](apps/web/DESIGN.md). Mock rules live in [AGENTS.md](AGENTS.md).

```
apps/api/src/db/schema/<feature>.ts       Drizzle tables
apps/api/src/features/<feature>/          routes.ts, service.ts, schema.ts
apps/api/src/plugins/                     shared server pieces (JWT, database, errors)
apps/web/src/app/feature-registry.tsx     one object per screen
apps/web/src/features/<feature>/          pages, hooks, api, types
apps/web/src/mocks/                       MSW handlers, only when VITE_API_MODE=mock
```

| Command | What it does |
| :--- | :--- |
| `pnpm dev` | API on port 3000 and web on port 5173, real Postgres |
| `pnpm dev:mock` | Web only, MSW intercepts `/api` |
| `pnpm db:generate` | Write a Drizzle migration after you change a table |
| `pnpm db:migrate` | Apply Drizzle migrations to Postgres |
| `pnpm db:seed` | Insert demo users and starter records |
| `pnpm test:api` | API checks against the running Postgres |
| `pnpm check:mock-leakage` | Fail if business records are hardcoded outside `mocks/` |
