# Team sync (three developers in parallel)

Every teammate runs this skill on a different feature. Syncing happens through git and `docs/features/<feature>.md`, not through chat memory.

## Claim and discover

```bash
git fetch --all --prune
git branch -r                                      # who is working on what
git ls-tree -r --name-only origin/main | rg "features/|docs/features/"
git diff --stat origin/main...origin/<teammate-branch> -- docs/features apps/backend/src/features
```

- Features claimed so far = files in `docs/features/` on `origin/main` and `feat/*` branches. Do not start a feature someone else has a branch for; ask the developer.
- As soon as step 2 is approved, ask the developer to commit and push `docs/features/<feature>.md` Part A (stories, roles, API contract) on its own and merge it to `main` early. Teammates read it to build against your endpoints.

## Depending on a teammate's feature

Check in this order:

1. **Merged on `origin/main`:** use it. Rebase and call the real endpoint.
2. **Not merged yet:** build against their Part A contract in `docs/features/<feature>.md` using an MSW mock. Their branch is for reading only, to check status or see how something works. Never build on it, merge it, or cherry-pick from it.
3. **Neither exists:** ask the developer to get the contract from the owner. Do not guess a shape.

Handling per case is in FRONTEND.md ("Dependencies on another feature's endpoints"). Backend-to-backend dependencies: read their service from `origin/main` only if merged, otherwise ask the developer.

Why: a branch is unfinished work. If you build on it and its owner changes it, your code breaks and the merge gets messy. `origin/main` only changes when someone finishes and tests their part.

## When to merge to main

Merge a feature as soon as its own parts pass tests in real mode. Do not wait until all features are done.

- **Foundation first:** the shared schema and any agreed contracts go to `main` before feature code that depends on them.
- **Producers before consumers:** merge the feature other features read from (e.g. Quotations) before the features that read it (e.g. Approvals).
- **Small and often:** merge a feature in a few days, not in one big batch. Rebase on `origin/main` before each merge.
- **Merged means real:** a feature is merged when its backend tests pass and its UI works in `pnpm dev:real`. If its own dependency is still mocked or not yet merged, its screens show the real error or empty state in real mode, not fake data. That is correct, and it shows what is still missing.
- **Mock swap is part of the merge:** when a dependency lands, the consumer rebases, switches to the real endpoint, and updates `MOCK_INVENTORY.md`.
- **Contract changes are announced:** if an owner must change a Part A contract, they update the doc, push it to `main`, and tell the team. Consumers update their mocks to match.
- **Final integration pass:** near the end, all three run the full flow in `pnpm dev:real` and confirm that `MOCK_INVENTORY.md` has no `MOCK ONLY` rows left. If many rows are still `MOCK ONLY`, merges were too late. Fix that first.

## Shared hot files

| File | Rule |
| :--- | :--- |
| `apps/backend/src/app.ts` | Append one import and one `register` line. |
| `apps/backend/src/db/schema/index.ts` | Append one export. Schema owner decides table changes. |
| `apps/frontend/src/app/feature-registry.tsx` | Append one object. |
| `apps/frontend/src/app/App.tsx` | Avoid; ask the developer first. |
| `apps/frontend/src/mocks/handlers/index.ts` | Append one spread. |
| `docs/MOCK_INVENTORY.md` | Append or edit only your rows. |
| `package.json`, `pnpm-lock.yaml` | Only for new dependencies; merge that change first and alone. |
| `apps/frontend/src/components/ui/*` | Reuse. New shared component (e.g. Skeleton): check `origin/main` first, add in its own commit. |
| `apps/backend/test-backend-e2e.mjs` | Do not edit; use `apps/backend/tests/<feature>.e2e.mjs`. |

Before touching a hot file: `git pull --rebase origin main`, make the one-line edit, commit it on its own, and tell the developer to announce it to the team. Resolve conflicts by keeping both sides' lines.

## Commit hygiene

- Branch `feat/<feature>`; small commits that touch only your feature folders plus the append-only lines above.
- Rebase on `origin/main` before the hand-off and after any dependency merges.
- Never force-push `main`. Never commit `.env` files.
- Do not commit or push unless the developer asks you to.
