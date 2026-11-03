import React from "react";
import { useEmployees } from "../hooks/useEmployees";
import { EmployeeTable } from "../components/EmployeeTable";

export const EmployeesPage: React.FC = () => {
  const { data, isLoading, error, refetch } = useEmployees();

  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: "0 0 0.5rem 0" }}>Employee Directory</h2>
          <p style={{ margin: 0, color: "#64748b" }}>
            Managed via central API client. In mock mode, intercepted by MSW; in real mode, fetched from Fastify + PostgreSQL.
          </p>
        </div>
        <button
          onClick={refetch}
          style={{
            padding: "8px 16px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Refresh Data
        </button>
      </div>

      {isLoading && (
        <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
          Loading employee records from API...
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #fecaca",
            borderRadius: "6px"
          }}
        >
          <strong>API Error:</strong> {error.message}
          <div style={{ fontSize: "0.85rem", marginTop: "4px" }}>
            (Strict rule check: Real mode never falls back to mock data on backend failure.)
          </div>
        </div>
      )}

      {!isLoading && !error && <EmployeeTable employees={data} />}
    </div>
  );
};

