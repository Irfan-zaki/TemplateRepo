import React, { useState } from "react";
import { useAuth } from "../../../app/AuthProvider";
import { useRecords } from "../hooks/useRecords";
import { RecordsTable } from "../components/RecordsTable";
import { RecordFormDialog } from "../components/RecordFormDialog";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
import { Card } from "../../../components/ui/Card";
import { PageHeader } from "../../../components/ui/PageHeader";

export const RecordsPage: React.FC = () => {
  const { user } = useAuth();
  const { data, isLoading, error, refetch } = useRecords();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const canWrite = user?.role === "admin" || user?.role === "manager";

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
  const activeCount = data.filter((record) => record.status === "active").length;

  return (
    <div style={{ padding: "var(--space-6, 24px)" }}>
      <PageHeader
        title="Records Console"
        description="Starter list, detail, and edit flow. Copy this feature folder when the brief arrives."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={refetch} isLoading={isLoading}>
              Refresh
            </Button>
            {canWrite && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setEditingId(null);
                  setDialogOpen(true);
                }}
              >
                New record
              </Button>
            )}
          </>
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "var(--space-4, 16px)",
          marginBottom: "var(--space-6, 24px)"
        }}
      >
        <Metric label="Total items" value={String(data.length)} />
        <Metric label="Active records" value={String(activeCount)} accent="var(--color-success-text)" />
        <Metric label="Aggregate valuation" value={`$${totalValue.toLocaleString()}`} accent="var(--color-primary)" />
      </div>

      {isLoading && (
        <div style={{ padding: "var(--space-8, 32px)", textAlign: "center", color: "var(--color-text-secondary)" }}>
          Retrieving records from API...
        </div>
      )}

      {error && (
        <Alert variant="danger" title="Request failed">
          {error.message}
        </Alert>
      )}

      {!isLoading && !error && (
        <Card elevation="sm" style={{ padding: 0, overflow: "hidden" }}>
          <RecordsTable
            records={data}
            onEdit={
              canWrite
                ? (record) => {
                    setEditingId(record.id);
                    setDialogOpen(true);
                  }
                : undefined
            }
          />
        </Card>
      )}

      <RecordFormDialog
        open={dialogOpen}
        recordId={editingId}
        onClose={() => setDialogOpen(false)}
        onSaved={refetch}
      />
    </div>
  );
};

const Metric: React.FC<{ label: string; value: string; accent?: string }> = ({ label, value, accent }) => (
  <div
    style={{
      padding: "16px",
      backgroundColor: "var(--color-muted)",
      border: "var(--border-ink)",
      borderRadius: "var(--radius-card)"
    }}
  >
    <div
      style={{
        fontSize: "var(--text-xs, 12px)",
        color: "var(--color-text-secondary)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontWeight: 600
      }}
    >
      {label}
    </div>
    <div className="font-mono" style={{ fontSize: "var(--text-2xl, 28px)", fontWeight: 700, marginTop: "4px", color: accent ?? "var(--color-text-primary)" }}>
      {value}
    </div>
  </div>
);
