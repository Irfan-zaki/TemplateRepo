import React, { useEffect, useState } from "react";
import { Alert } from "../../../components/ui/Alert";
import { Button } from "../../../components/ui/Button";
import { Dialog } from "../../../components/ui/Dialog";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { ApiError } from "../../../lib/api-client";
import { createRecord, getRecord, updateRecord } from "../records.api";
import { RecordInput, RecordStatus } from "../types";

const STATUS_OPTIONS: { value: RecordStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "archived", label: "Archived" }
];

const emptyForm: RecordInput = {
  title: "",
  category: "",
  status: "active",
  value: 0
};

interface RecordFormDialogProps {
  open: boolean;
  recordId: string | null;
  onClose: () => void;
  onSaved: () => void;
}

export const RecordFormDialog: React.FC<RecordFormDialogProps> = ({ open, recordId, onClose, onSaved }) => {
  const [form, setForm] = useState<RecordInput>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (!recordId) {
      setForm(emptyForm);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    getRecord(recordId)
      .then((response) => {
        if (cancelled) return;
        setForm({
          title: response.data.title,
          category: response.data.category,
          status: response.data.status,
          value: response.data.value
        });
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Could not load this record.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, recordId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim() || !form.category.trim()) {
      setError("Title and category are required.");
      return;
    }
    if (!Number.isFinite(form.value)) {
      setError("Value must be a number.");
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      if (recordId) {
        await updateRecord(recordId, form);
      } else {
        await createRecord(form);
      }
      onSaved();
      onClose();
    } catch (err: unknown) {
      setError(err instanceof ApiError ? err.message : "Could not save this record.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} title={recordId ? "Edit record" : "New record"} onClose={onClose}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4, 16px)" }}>
        {error && (
          <Alert variant="danger" title="Could not save">
            {error}
          </Alert>
        )}
        {isLoading ? (
          <p style={{ margin: 0, color: "var(--text-muted)" }}>Loading record...</p>
        ) : (
          <>
            <Input label="Title" required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
            <Input
              label="Category"
              required
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
            />
            <Select
              label="Status"
              required
              value={form.status}
              options={STATUS_OPTIONS}
              onChange={(event) => setForm({ ...form, status: event.target.value as RecordStatus })}
            />
            <Input
              label="Value"
              type="number"
              required
              value={String(form.value)}
              onChange={(event) => setForm({ ...form, value: Number(event.target.value) })}
            />
          </>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSaving} disabled={isLoading}>
            Save record
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
