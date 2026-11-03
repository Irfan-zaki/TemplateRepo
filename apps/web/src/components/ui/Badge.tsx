import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "neutral";
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  children,
  style,
  ...props
}) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    success: {
      backgroundColor: "var(--color-success-surface)",
      color: "var(--color-success-text)",
      border: "1.5px solid var(--color-success-border)"
    },
    warning: {
      backgroundColor: "var(--color-warning-surface)",
      color: "var(--color-warning-text)",
      border: "1.5px solid var(--color-warning-border)"
    },
    danger: {
      backgroundColor: "var(--color-danger-surface)",
      color: "var(--color-danger-text)",
      border: "1.5px solid var(--color-danger-border)"
    },
    neutral: {
      backgroundColor: "var(--color-neutral-surface)",
      color: "var(--color-neutral-text)",
      border: "1.5px solid var(--color-neutral-border)"
    }
  };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        padding: "2px 8px",
        borderRadius: "var(--radius-badge)",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.03em",
        textTransform: "uppercase",
        fontFamily: "var(--font-sans)",
        lineHeight: 1.2,
        ...variantStyles[variant],
        ...style
      }}
      {...props}
    >
      {children}
    </span>
  );
};

