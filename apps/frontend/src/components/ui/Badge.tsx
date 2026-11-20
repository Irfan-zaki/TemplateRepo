import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  children: React.ReactNode;
}

/** Tinted pill badge (Odoo style). `info` uses the tertiary (teal) palette. */
export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  children,
  style,
  ...props
}) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    success: {
      backgroundColor: "var(--success-bg)",
      color: "var(--success-text)",
      border: "1px solid var(--success-line)"
    },
    warning: {
      backgroundColor: "var(--warning-bg)",
      color: "var(--warning-text)",
      border: "1px solid var(--warning-line)"
    },
    danger: {
      backgroundColor: "var(--danger-bg)",
      color: "var(--danger-text)",
      border: "1px solid var(--danger-line)"
    },
    info: {
      backgroundColor: "var(--accent-tint)",
      color: "var(--accent-text)",
      border: "1px solid var(--accent-line)"
    },
    neutral: {
      backgroundColor: "var(--neutral-bg)",
      color: "var(--neutral-text)",
      border: "1px solid var(--neutral-line)"
    }
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        padding: "2px 10px",
        borderRadius: "var(--radius-badge)",
        fontSize: "var(--text-xs, 12px)",
        fontWeight: "var(--font-semibold, 600)" as unknown as number,
        textTransform: "capitalize",
        whiteSpace: "nowrap",
        fontFamily: "var(--font-sans)",
        lineHeight: 1.4,
        ...variantStyles[variant],
        ...style
      }}
      {...props}
    >
      {children}
    </span>
  );
};
