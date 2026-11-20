# Feature doc template

Create `docs/features/<feature>.md` with this structure. Part A is written in steps 1 and 2 and committed early so teammates can build against it. Part B is written in step 6.

````markdown
# <Feature name>

Owner: <developer> | Branch: feat/<feature> | Status: in progress | built | verified

## Part A: Spec (contract for teammates)

### User stories
| ID | Role | Story | Acceptance |
| :--- | :--- | :--- | :--- |
| US-1 | manager | ... | Given / When / Then |

### Roles and permissions
| Action | admin | manager | member | other roles |

### API contract
For each endpoint: method and path, roles, request body (field, type, rule), response `data` shape, error codes.

### Screens
For each screen: purpose, fields, actions, states (loading, empty, error, forbidden), data needed.

### Depends on
Other features and the endpoints used; whether each is real or mocked, and where the mock lives.

### Assumptions (reviewed with the developer)
| # | Assumption | Decision |

## Part B: Walkthrough (written when the feature is built)

### 1. Try it live
### 2. How it works
### 3. What you can add next
### 4. Test coverage
````

## Rules for Part B

**1. Try it live** comes first. A numbered script the developer can follow in `pnpm dev` right now:

- Log-in account and role to use (from `docs/SETUP.md`).
- A realistic Indian-business scenario that fits the feature. Pick one that matches the brief's domain, for example a Ludhiana hosiery exporter quoting 5,000 thermal vests to a Mumbai retailer, a Pune auto-parts supplier with 18% GST, an Amritsar sweets chain running monthly subscriptions, a Bengaluru SaaS firm billing in INR. Real-sounding company names and cities, amounts in INR with lakh grouping (e.g. Rs 4,72,500), GST rates and dates in `en-IN` format.
- Each step names the screen, the exact values to type, and what the developer should see (including the skeleton while loading, the empty state before the first record, and the permission-restricted view for a lower role).
- End with the check that proves persistence: refresh and confirm the data is still there.
- The values are typed in the UI. Only add them to a backend seed file (`apps/backend/src/db/seeds/`) if the developer asks for it, since seed files are shared.

**2. How it works**: request flow from page to hook to `apiClient` to route to service to Postgres, in a few sentences. Name the actual files. Explain the business rules and role checks in plain language. Add one small mermaid diagram if there is a state machine.

**3. What you can add next**: three to six concrete ideas that build on this feature, each with the files it would touch and a rough size (small, medium, large). Pull from requirements that were out of scope, deliberate shortcuts, and obvious extensions (filters, export, audit trail, notifications, bulk actions).

**4. Test coverage**: list the story IDs with the test file and test name that proves each one, plus anything not covered.

Keep it factual and short. No emoji. Do not describe features that were not built.
