import React from "react";
import { useEmployees } from "../hooks/useEmployees";
import { EmployeeTable } from "../components/EmployeeTable";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";

export const EmployeesPage: React.FC = () => {
  const { data, isLoading, error, refetch } = useEmployees();

  return (
    <div style={{ padding: "var(--space-6, 24px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6, 24px)" }}>
        <div>
          <h2 style={{ margin: "0 0 var(--space-2, 8px) 0", fontSize: "var(--text-xl, 22px)", fontWeight: 600, color: "var(--color-text-primary)" }}>
            Employee Directory
          </h2>
          <p style={{ margin: 0, fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>
            Managed via central API client. In mock mode, intercepted by MSW; in real mode, fetched from Fastify + PostgreSQL.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={refetch}
        >
          Refresh Data
        </Button>
      </div>

      {isLoading && (
        <div style={{ padding: "var(--space-8, 32px)", textAlign: "center", fontSize: "var(--text-base, 15px)", color: "var(--color-text-secondary)" }}>
          Loading employee records from API...
        </div>
      )}

      {error && (
        <Alert variant="danger" title="API Error">
          {error.message}
          <div style={{ fontSize: "var(--text-xs, 12px)", marginTop: "var(--space-1, 4px)" }}>
            (Strict rule check: Real mode never falls back to mock data on backend failure.)
          </div>
        </Alert>
      )}

      {!isLoading && !error && <EmployeeTable employees={data} />}
    </div>
  );
};

