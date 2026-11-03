  # AI Agent Guidelines & Architecture Rules

## Mock Data Management Rules — MANDATORY

1. **Never write mock business data directly inside React components.**
2. **Never hardcode sample employees, attendance records, leave requests, salary rules or payroll records in feature pages.**
3. **Never create local fallback data when an API request fails.**
4. **Never use setTimeout to simulate successful API operations.**
5. **Every frontend data request must go through the centralized API client (`apps/web/src/lib/api-client.ts`).**
6. **Temporary API mocks must be created exclusively inside `apps/web/src/mocks/`.**
7. **Every mock endpoint must have a corresponding handler and fixture.**
8. **Never create a second mock implementation for an endpoint that already has a handler.**
9. **Use shared TypeScript/Zod API contracts for both real and mocked responses.**
10. **MSW must only run when `VITE_API_MODE=mock` and the application is in development mode.**
11. **Real mode must never silently fall back to fake data.**
12. **Display a visible DEVELOPMENT MOCK MODE indicator whenever MSW is active.**
13. **Keep `docs/MOCK_INVENTORY.md` updated whenever a mock endpoint is added, changed or replaced.**
14. **Before marking a feature complete, test it using `VITE_API_MODE=real`.**
15. **Verify that database changes persist after refreshing the application.**
16. **Do not remove legitimate PostgreSQL seed data when removing frontend mock fixtures.**
17. **Do not modify unrelated existing features or API contracts without coordination.**

---

## Anti-Pattern Examples (STRICTLY PROHIBITED)

```tsx
// ❌ DANGEROUS: Fake fallback if API fails
const employees = apiData || mockEmployees;

// ❌ DANGEROUS: Fake successful response in catch block
catch (error) {
  return mockEmployees;
}

// ❌ DANGEROUS: Hardcoded business records in component state
const [employees] = useState([
  { id: 1, name: "John", department: "HR" }
]);

// ❌ DANGEROUS: Simulating API latency with setTimeout instead of network interceptor
setTimeout(() => setSaved(true), 500);
```

### ✅ Approved Pattern

```tsx
// ✅ Component uses a custom hook backed by central apiClient
const { data, isLoading, error } = useEmployees();

if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
return <EmployeeTable employees={data} />;
```

---

## Feature Completion Requirements

A feature is not complete until:

- [ ] Its API endpoint is implemented in Fastify backend.
- [ ] Its backend logic is connected to PostgreSQL.
- [ ] Its frontend calls the centralized API client.
- [ ] Its RBAC checks work.
- [ ] Its validation works.
- [ ] It has been tested in real API mode (`pnpm dev:real`).
- [ ] It does not depend on mock fixtures to display business records.

### Hand-off Report Requirement
At the end of every feature implementation, report:
1. Files containing mock handlers or fixtures.
2. API endpoints still using mocks.
3. Real endpoints implemented.
4. Real endpoints verified.
5. Any remaining hardcoded business data.
6. Any incomplete backend or database functionality.

