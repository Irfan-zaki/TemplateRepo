# HackCore

Starter for a 24-hour hackathon. React and Vite on the web, Fastify and PostgreSQL on the API. Feature folders stay independent so three or four people can split screens after the schema and routes exist.

The runbook is [docs/SETUP.md](docs/SETUP.md). Design tokens live in [apps/web/DESIGN.md](apps/web/DESIGN.md). Mock rules live in [AGENTS.md](AGENTS.md).

```
apps/api/src/routes/<feature>.ts     one Fastify plugin per teammate
apps/api/db/migrations/00N_<name>.sql   schema changes during the event
apps/web/src/app/feature-registry.tsx   one object per screen
apps/web/src/features/<feature>/        pages, hooks, api, types
apps/web/src/mocks/                     MSW handlers, only when VITE_API_MODE=mock
```

| Command | What it does |
| :--- | :--- |
| `pnpm dev` | API on port 3000 and web on port 5173, real Postgres |
| `pnpm dev:mock` | Web only, MSW intercepts `/api` |
| `pnpm db:migrate` | Apply SQL files in `apps/api/db/migrations` |
| `pnpm db:seed` | Insert demo users and starter records |
| `pnpm test:api` | API checks against the running Postgres |
| `pnpm check:mock-leakage` | Fail if business records are hardcoded outside `mocks/` |
