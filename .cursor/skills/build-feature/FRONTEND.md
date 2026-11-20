# Frontend steps

Pattern source: `apps/frontend/src/features/records/`. Design source of truth: `apps/frontend/DESIGN.md` and `src/styles/tokens.css`. Re-read DESIGN.md before writing any UI.

## Folder layout

```
apps/frontend/src/features/<feature>/
  types.ts            API types, mirror the backend contract exactly
  <feature>.api.ts    functions calling apiClient only
  hooks/              use<Feature>s, use<Feature>(id), mutations
  components/         tables, forms, dialogs, skeletons
  pages/              one page per screen in the spec
```

Then append one object to `apps/frontend/src/app/feature-registry.tsx` (`id`, `path`, `label`, `roles`, `page`).

## Rules for every screen

- Data comes only from hooks that call `apiClient`. No arrays of business records in components, no `x || fallback`, no `catch` returning fake data, no `setTimeout`.
- Role-gate action buttons (`user.role`), but the API remains the real gate.
- Lists and control panels run edge to edge; only forms and dialogs are width-limited.
- Reference colours and spacing by CSS variable (`var(--brand)`, `var(--space-4)`), not hex. Reuse `components/ui/*` (Button, Table, Dialog, Badge, Alert, Input, Select, PageHeader).
- Status badges use only the Success / Warning / Danger / Info tokens. Map each business status to one of them in a single `statusTone` helper per feature.
- Format money and dates for India when the brief is Indian: `new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" })`, `en-IN` dates.

## Required states (all three are tested)

| State | Requirement |
| :--- | :--- |
| Loading | Skeleton placeholders that match the final layout (table rows, KPI tiles, detail fields). Never a bare "Loading..." text or spinner-only page. Give each skeleton wrapper `data-testid="<feature>-skeleton"`. |
| Empty | Title, one sentence on why it is empty, and the primary action when the role may create. No emoji. `data-testid="<feature>-empty"`. |
| Error | `Alert variant="danger"` with the server message and a Retry button that refetches. Never substitute data. |

Also handle forbidden (403 shows a clear message, not a blank page) and not found on detail screens.

Skeleton component: if `apps/frontend/src/components/ui/Skeleton.tsx` does not exist on `origin/main`, create it and tell teammates (it is shared). It must be flat: a solid block using a beige or line token from `tokens.css` (for example `var(--line)`) with an opacity pulse. No gradient shimmer, because gradients are forbidden.

## Dependencies on another feature's endpoints

Check first, in this order (see TEAM-SYNC.md for the full rules and merge timing):

1. Endpoint is on `origin/main`: rebase and call it for real. No mock.
2. Endpoint is not on `origin/main` yet: build against the teammate's Part A contract. You may read their branch to check progress, but do not build on it or merge it.
   - Check `apps/frontend/src/mocks/handlers/` and `docs/MOCK_INVENTORY.md` first. If a handler already exists for that endpoint, reuse it. Never add a second one.
   - Otherwise add `mocks/fixtures/<dep>.fixture.ts` and `mocks/handlers/<dep>.handlers.ts` that mirror the contract and the role rules, add it to `mocks/handlers/index.ts` (append-only), and add a row to `docs/MOCK_INVENTORY.md` with status `MOCK ONLY`.
   - Use the same types as the contract; do not reshape responses.
3. Neither exists: ask the developer to get the contract from the owner. Do not guess a shape.

Your own feature's endpoints are built for real in step 3, so they never need a mock. When a dependency merges: rebase, run against real mode, update the inventory row to `REAL API VERIFIED`, keep the handler so `pnpm dev:mock` still works.

## Visual check

Run `pnpm dev`, open the page in the Cursor browser tool, and screenshot loading, empty, populated, and error states. Compare to the screen spec and to DESIGN.md. Run `pnpm check:mock-leakage` and `pnpm --filter frontend exec tsc --noEmit`.
