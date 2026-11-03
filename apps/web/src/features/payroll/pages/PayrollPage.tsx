import React from "react";
import { usePayroll } from "../hooks/usePayroll";
import { PayrollTable } from "../components/PayrollTable";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";

export const PayrollPage: React.FC = () => {
  const { rules, payruns, isLoading, error, refetch } = usePayroll();

  return (
    <div style={{ padding: "var(--space-6, 24px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6, 24px)" }}>
        <div>
          <h2 style={{ margin: "0 0 var(--space-2, 8px) 0", fontSize: "var(--text-xl, 22px)", fontWeight: 600, color: "var(--color-text-primary)" }}>
            Payroll Management
          </h2>
          <p style={{ margin: 0, fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>
            Salary structures, rules, and monthly payroll processing.
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
          Loading payroll data from API...
        </div>
      )}

      {error && (
        <Alert variant="danger" title="API Error">
          {error.message}
        </Alert>
      )}

      {!isLoading && !error && <PayrollTable rules={rules} payruns={payruns} />}
    </div>
  );
};

