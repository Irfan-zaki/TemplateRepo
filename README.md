# PeoplePay360 — AI-Assisted Architecture & Mock Data Management

This repository implements a strict **Mock Data Management Strategy** for parallel AI-assisted development during the hackathon.

---

## 1. The Architecture: One API, Two Data Sources

The frontend components never know whether the response originated from MSW fixtures or PostgreSQL.

```
                      React Components
       (Employees, Attendance, Time-off, Payroll)
                           │
                           ▼
                  Central API Client
                 (src/lib/api-client.ts)
                 Same contracts & types
                           │
          ┌────────────────┴────────────────┐
          ▼                                 ▼
      Mock Mode                         Real Mode
(VITE_API_MODE=mock)               (VITE_API_MODE=real)
MSW Intercepts Requests            Direct HTTP Request
  ↳ Returns Fixtures                 ↳ Fastify Backend ↳ PostgreSQL
```

---

## 2. Directory Structure

```
.
├── AGENTS.md                          # Mandatory AI Agent rules & feature completion checklist
├── docs/
│   └── MOCK_INVENTORY.md              # Mock inventory & API migration tracker
├── scripts/
│   └── check-mock-leakage.mjs         # Automated mock leakage detection script
├── apps/
│   ├── api/                           # Backend API (Fastify + PostgreSQL)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts               # Fastify API entry point
│   │       └── db/
│   │           └── seeds/             # Real database seed records
│   │               ├── users.seed.ts
│   │               ├── departments.seed.ts
│   │               ├── employees.seed.ts
│   │               ├── contracts.seed.ts
│   │               ├── attendance.seed.ts
│   │               ├── time-off.seed.ts
│   │               ├── payroll.seed.ts
│   │               └── index.ts
│   │
│   └── web/                           # Frontend Client (Vite + React + MSW)
│       ├── .env.mock                  # VITE_API_MODE=mock
│       ├── .env.real                  # VITE_API_MODE=real
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       ├── index.html
│       ├── public/
│       │   └── mockServiceWorker.js   # MSW browser service worker
│       └── src/
│           ├── app/
│           │   ├── App.tsx            # Main shell with mock mode status banner
│           │   └── main.tsx           # Conditional MSW bootstrap
│           │
│           ├── lib/
│           │   └── api-client.ts      # Central HTTP client (strictly no mock fallbacks)
│           │
│           ├── types/
│           │   └── api.ts             # Shared API contracts & TypeScript interfaces
│           │
│           ├── features/              # Feature modules (strictly NO fabricated business data)
│           │   ├── employees/
│           │   │   ├── pages/EmployeesPage.tsx
│           │   │   ├── components/EmployeeTable.tsx
│           │   │   ├── hooks/useEmployees.ts
│           │   │   └── employee.api.ts
│           │   ├── attendance/
│           │   │   ├── pages/AttendancePage.tsx
│           │   │   ├── components/AttendanceTable.tsx
│           │   │   ├── hooks/useAttendance.ts
│           │   │   └── attendance.api.ts
│           │   ├── time-off/
│           │   │   ├── pages/TimeOffPage.tsx
│           │   │   ├── components/TimeOffTable.tsx
│           │   │   ├── hooks/useTimeOff.ts
│           │   │   └── time-off.api.ts
│           │   └── payroll/
│           │       ├── pages/PayrollPage.tsx
│           │       ├── components/PayrollTable.tsx
│           │       ├── hooks/usePayroll.ts
│           │       └── payroll.api.ts
│           │
│           └── mocks/                 # Dedicated Mock layer
│               ├── browser.ts         # MSW browser setupWorker
│               ├── handlers/
│               │   ├── index.ts
│               │   ├── employees.handlers.ts
│               │   ├── attendance.handlers.ts
│               │   ├── time-off.handlers.ts
│               │   └── payroll.handlers.ts
│               └── fixtures/
│                   ├── employees.fixture.ts
│                   ├── attendance.fixture.ts
│                   ├── time-off.fixture.ts
│                   └── payroll.fixture.ts
```

---

## 3. Available Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts frontend in **real mode** by default (`vite --mode real`) |
| `pnpm dev:mock` | Starts frontend with **MSW mock interception enabled** |
| `pnpm dev:real` | Explicitly starts frontend connecting to Fastify backend |
| `pnpm build` | Production build (mocks strictly disabled) |
| `pnpm db:seed` | Populates PostgreSQL database with idempotent demo dataset |
| `pnpm check:mock-leakage` | Scans `apps/web/src` (outside `mocks/`) for forbidden hardcoded records |

---

## 4. Testing Protocols

### Session A: UI Testing (Mock Mode)
```bash
pnpm dev:mock
```
- Validates layouts, navigation, forms, empty states, and mock responses.

### Session B: Integration Testing (Real Mode)
```bash
docker compose up -d
pnpm db:seed
pnpm dev:real
```
- Verifies real Fastify endpoints, database persistence, RBAC checks, and end-to-end integration.

