import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";

export interface DialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, title, onClose, children }) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(43, 36, 48, 0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-6, 24px)",
        zIndex: 30
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "min(520px, 100%)",
          backgroundColor: "var(--card)",
          border: "var(--border-strong)",
          borderRadius: "var(--radius-card)",
          padding: "var(--space-6, 24px)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4, 16px)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
          <h2 style={{ margin: 0, fontSize: "var(--text-xl, 22px)", fontWeight: 600 }}>{title}</h2>
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};
