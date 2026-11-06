import React from "react";
import { useRecords } from "../hooks/useRecords";
import { RecordsTable } from "../components/RecordsTable";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { Card } from "../../../components/ui/Card";

export const RecordsPage: React.FC = () => {
  const { data, isLoading, error, refetch } = useRecords();

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
  const activeCount = data.filter((r) => r.status === "active").length;

  return (
    <div style={{ padding: "var(--space-6, 24px)" }}>
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "var(--space-6, 24px)"
        }}
      >
        <div>
          <h2
            style={{
              margin: "0 0 var(--space-2, 8px) 0",
              fontSize: "var(--text-xl, 22px)",
              fontWeight: 600,
              color: "var(--color-text-primary)"
            }}
          >
            Records Console
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "var(--text-sm, 13px)",
              color: "var(--color-text-secondary)"
            }}
          >
            Pluggable feature starter template. Demonstrates end-to-end data fetching, typed table rendering, and mock-to-real switching.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={refetch} isLoading={isLoading}>
          Refresh Records
        </Button>
      </div>

      {/* Metrics Row (Neo-minimalist stat cards) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "var(--space-4, 16px)",
          marginBottom: "var(--space-6, 24px)"
        }}
      >
        <div
          style={{
            padding: "16px",
            backgroundColor: "var(--color-muted)",
            border: "var(--border-ink)",
            borderRadius: "var(--radius-card)"
          }}
        >
          <div style={{ fontSize: "var(--text-xs, 12px)", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
            Total Items
          </div>
          <div className="font-mono" style={{ fontSize: "var(--text-2xl, 28px)", fontWeight: 700, color: "var(--color-text-primary)", marginTop: "4px" }}>
            {data.length}
          </div>
        </div>

        <div
          style={{
            padding: "16px",
            backgroundColor: "var(--color-muted)",
            border: "var(--border-ink)",
            borderRadius: "var(--radius-card)"
          }}
        >
          <div style={{ fontSize: "var(--text-xs, 12px)", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
            Active Records
          </div>
          <div className="font-mono" style={{ fontSize: "var(--text-2xl, 28px)", fontWeight: 700, color: "var(--color-success-text)", marginTop: "4px" }}>
            {activeCount}
          </div>
        </div>

        <div
          style={{
            padding: "16px",
            backgroundColor: "var(--color-muted)",
            border: "var(--border-ink)",
            borderRadius: "var(--radius-card)"
          }}
        >
          <div style={{ fontSize: "var(--text-xs, 12px)", color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>
            Aggregate Valuation
          </div>
          <div className="font-mono" style={{ fontSize: "var(--text-2xl, 28px)", fontWeight: 700, color: "var(--color-primary)", marginTop: "4px" }}>
            ${totalValue.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Loading & Error States */}
      {isLoading && (
        <div
          style={{
            padding: "var(--space-8, 32px)",
            textAlign: "center",
            fontSize: "var(--text-base, 15px)",
            color: "var(--color-text-secondary)"
          }}
        >
          Retrieving records from API...
        </div>
      )}

      {error && (
        <Alert variant="danger" title="Request Failed">
          {error.message}
          <div style={{ fontSize: "var(--text-xs, 12px)", marginTop: "var(--space-1, 4px)" }}>
            (Strict rule check: Real mode never falls back to mock data on backend failure.)
          </div>
        </Alert>
      )}

      {/* Main Table */}
      {!isLoading && !error && (
        <Card elevation="sm" style={{ padding: 0, overflow: "hidden" }}>
          <RecordsTable records={data} />
        </Card>
      )}
    </div>
  );
};

