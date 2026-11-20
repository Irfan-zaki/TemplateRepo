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
      surface: "var(--danger-bg)",
      text: "var(--danger-text)",
      border: "var(--danger-line)",
      accentHex: "var(--danger)",
      IconComponent: CircleAlertIcon
    },
    success: {
      surface: "var(--success-bg)",
      text: "var(--success-text)",
      border: "var(--success-line)",
      accentHex: "var(--success)",
      IconComponent: CircleCheckIcon
    },
    warning: {
      surface: "var(--warning-bg)",
      text: "var(--warning-text)",
      border: "var(--warning-line)",
      accentHex: "var(--warning)",
      IconComponent: TriangleAlertIcon
    },
    neutral: {
      surface: "var(--neutral-bg)",
      text: "var(--neutral-text)",
      border: "var(--neutral-line)",
      accentHex: "var(--text-muted)",
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
        border: `1px solid ${border}`,
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

