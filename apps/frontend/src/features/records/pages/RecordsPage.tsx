import React, { useState } from "react";
import { useAuth } from "../../../app/AuthProvider";
import { useRecords } from "../hooks/useRecords";
import { RecordsTable } from "../components/RecordsTable";
import { RecordFormDialog } from "../components/RecordFormDialog";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";
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
    <div>
      <PageHeader
        title="Records Console"
        description="Starter list, detail, and edit flow. Copy this feature folder when the brief arrives."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={refetch} isLoading={isLoading}>
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
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-3, 12px)",
          padding: "var(--space-4, 16px) var(--layout-gutter)"
        }}
      >
        <Metric label="Total items" value={String(data.length)} tone="secondary" />
        <Metric label="Active records" value={String(activeCount)} tone="success" />
        <Metric label="Aggregate valuation" value={`$${totalValue.toLocaleString()}`} tone="tertiary" />
      </div>

      {isLoading && (
        <div style={{ padding: "var(--space-8, 32px) var(--layout-gutter)", textAlign: "center", color: "var(--text-muted)" }}>
          Retrieving records from API...
        </div>
      )}

      {error && (
        <div style={{ padding: "0 var(--layout-gutter) var(--space-4, 16px)" }}>
          <Alert variant="danger" title="Request failed">
            {error.message}
          </Alert>
        </div>
      )}

      {!isLoading && !error && (
        <section
          style={{
            backgroundColor: "var(--card)",
            borderTop: "var(--border-default)",
            borderBottom: "var(--border-default)"
          }}
        >
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
        </section>
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

type MetricTone = "secondary" | "tertiary" | "success";

const METRIC_TONES: Record<MetricTone, { surface: string; border: string; text: string }> = {
  secondary: {
    surface: "var(--brand-tint)",
    border: "var(--brand-line)",
    text: "var(--brand)"
  },
  tertiary: {
    surface: "var(--accent-tint)",
    border: "var(--accent-line)",
    text: "var(--accent-text)"
  },
  success: {
    surface: "var(--success-bg)",
    border: "var(--success-line)",
    text: "var(--success-text)"
  }
};

/** Tinted KPI tile in the Odoo list-view style. */
const Metric: React.FC<{ label: string; value: string; tone: MetricTone }> = ({ label, value, tone }) => {
  const colors = METRIC_TONES[tone];
  return (
    <div
      style={{
        minWidth: "160px",
        padding: "10px 16px",
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: "var(--radius-card)"
      }}
    >
      <div className="font-mono" style={{ fontSize: "var(--text-xl, 22px)", fontWeight: 600, color: colors.text }}>
        {value}
      </div>
      <div style={{ fontSize: "var(--text-sm, 13px)", color: "var(--text-muted)" }}>{label}</div>
    </div>
  );
};
