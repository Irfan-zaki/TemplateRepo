---
name: build-feature
description: Builds one product feature end to end in this monorepo: requirement and design analysis, Fastify backend (schema.ts, service.ts, routes.ts), React UI following DESIGN.md, backend and Playwright tests, then a walkthrough doc with an Indian-business live example. Use when a teammate starts a new feature from the problem statement and the DB schema and API endpoints are already planned.
disable-model-invocation: true
---

# Build a feature end to end

Input: a feature name (e.g. `quotations`), the problem statement (PDF or MD), the Excalidraw board, and a planned DB schema plus endpoint list. Three teammates run this skill in parallel, so sync rules in [TEAM-SYNC.md](TEAM-SYNC.md) apply from the first step.

`AGENTS.md` (mock rules, feature-completion checklist, hand-off report) and `apps/frontend/DESIGN.md` always win over this skill.

Copy this checklist and tick it as you go:

```
- [ ] 0 Preflight and claim the feature
- [ ] 1 Requirement analysis
- [ ] 2 Design analysis, screen spec, assumptions reviewed by the developer
- [ ] 3 Backend: schema.ts -> service.ts -> routes.ts -> registered in app.ts
- [ ] 4 Frontend: types, api, hooks, components, page, registry entry
- [ ] 5 Testing: backend integration + acceptance, Playwright behaviour, states, real-mode refresh
- [ ] 6 Live example + explanation doc, then hand-off report
```

## 0. Preflight

1. `git fetch --all`, then `git pull --rebase origin main`. Create `feat/<feature>` if not already on it.
2. Follow [TEAM-SYNC.md](TEAM-SYNC.md) to see what teammates own and which endpoints already exist.
3. Confirm the feature's tables exist in `apps/backend/src/db/schema/` and migrations are applied (`pnpm db:migrate`). If tables are missing or differ from the plan, stop and tell the developer. Do not invent schema.
4. Confirm the endpoint list. If none exists, propose one in step 1 and mark it as an assumption.

## 1. Requirement analysis

1. Find the problem statement: path given by the developer, else look in `docs/`. PDFs and MD files can both be read directly.
2. Extract only what this feature owns: user stories, roles and who may do what, fields and validation rules, status transitions, business rules, calculations, and links to other features.
3. Create `docs/features/<feature>.md` from [FEATURE-DOC-TEMPLATE.md](FEATURE-DOC-TEMPLATE.md) and fill Part A (stories, roles, API contract, dependencies). Part A is the contract teammates build against, so keep it exact.
4. List unclear requirements as numbered assumptions. Do not silently decide them.

## 2. Design analysis and screens

1. Read the board as text: `node .cursor/skills/build-feature/scripts/excalidraw-to-text.mjs "<board>.excalidraw" "<screen name filter>"`. If `docs/HACKATHON_SCREENS.md` already covers the screens, use it and spot-check against the board.
2. Per screen, write into Part A of the feature doc: purpose, fields, actions, states (loading, empty, error, forbidden), role-based visibility, and the data each element needs from the API.
3. Sample values on the board (names, amounts) are wireframe placeholders. Never hardcode them.
4. **Gate.** Present every assumption from steps 1 and 2 to the developer with `AskQuestion` (one question per material assumption, options plus "Other"). Wait for answers, record them in the doc, and only then continue. If there are no assumptions, say so explicitly.

## 3. Backend

Follow [BACKEND.md](BACKEND.md). Order is fixed: `schema.ts`, then `service.ts`, then `routes.ts`, then register in `app.ts`. Copy `apps/backend/src/features/records/`.

## 4. Frontend

Follow [FRONTEND.md](FRONTEND.md). It covers the UI, the required loading/empty/error states, and what to do when a screen depends on another teammate's unmerged endpoint.

## 5. Testing

Follow [TESTING.md](TESTING.md). Every layer must pass before step 6: backend integration, acceptance per user story, Playwright behaviour tests, states check, and `pnpm dev:real` refresh persistence.

## 6. Live example, explanation doc, hand-off

1. Fill Part B of `docs/features/<feature>.md`. Rules are in [FEATURE-DOC-TEMPLATE.md](FEATURE-DOC-TEMPLATE.md).
2. In chat, give the developer the live example first: a short numbered script they can try in the running UI using an Indian-business scenario (see the template). Then explain how the feature works, then what could be added later. The same content goes in the doc.
3. Finish with the hand-off report required by `AGENTS.md` (six items), plus: files in shared hot files that you touched, endpoints you consumed through a mock because a teammate has not merged yet, and anything not verified.
4. Do not mark the feature complete if any item of the `AGENTS.md` completion checklist is unchecked. Say which one and why.

## Hard rules (quick recall)

- No business data in components; no fallback data on API failure; no `setTimeout` fake success; all requests through `apps/frontend/src/lib/api-client.ts`.
- Mocks only in `apps/frontend/src/mocks/`, one handler per endpoint, listed in `docs/MOCK_INVENTORY.md`.
- Flat UI: no gradients, no shadows, no emoji in the DOM, status colours only from `DESIGN.md`.
- Do not change unrelated features or existing API contracts.
