import React from "react";
import { CircleAlertIcon, CircleCheckIcon, TriangleAlertIcon } from "./icons";

export interface AlertProps {
  variant?: "danger" | "success" | "warning" | "neutral";
  title?: string;
  children: React.ReactNode;
  icon?: boolean;
}

export const Alert: React.FC<AlertProps> = ({
  variant = "danger",
  title,
  children,
  icon = true
}) => {
  const configs = {
    danger: {
      surface: "var(--color-danger-surface)",
      text: "var(--color-danger-text)",
      border: "var(--color-danger-border)",
      accentHex: "var(--color-danger)",
      IconComponent: CircleAlertIcon
    },
    success: {
      surface: "var(--color-success-surface)",
      text: "var(--color-success-text)",
      border: "var(--color-success-border)",
      accentHex: "var(--color-success)",
      IconComponent: CircleCheckIcon
    },
    warning: {
      surface: "var(--color-warning-surface)",
      text: "var(--color-warning-text)",
      border: "var(--color-warning-border)",
      accentHex: "var(--color-warning)",
      IconComponent: TriangleAlertIcon
    },
    neutral: {
      surface: "var(--color-neutral-surface)",
      text: "var(--color-neutral-text)",
      border: "var(--color-neutral-border)",
      accentHex: "var(--color-ink)",
      IconComponent: CircleAlertIcon
    }
  };

  const { surface, text, border, accentHex, IconComponent } = configs[variant];

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        padding: "10px 14px",
        borderRadius: "var(--radius-card)",
        backgroundColor: surface,
        color: text,
        border: `1.5px solid ${border}`,
        fontSize: "0.875rem",
        lineHeight: 1.4
      }}
    >
      {icon && (
        <div style={{ flexShrink: 0, marginTop: "2px", color: accentHex }}>
          <IconComponent size={18} strokeWidth={2} />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "100%" }}>
        {title && <div style={{ fontWeight: 700 }}>{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  );
};

