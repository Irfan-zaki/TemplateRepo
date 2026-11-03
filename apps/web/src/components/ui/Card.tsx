import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevation?: "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  elevation = "md",
  style,
  className = "",
  ...props
}) => {
  const shadows = {
    sm: "var(--shadow-hard)",
    md: "var(--shadow-hard-lg)",
    lg: "var(--shadow-hard-xl)"
  };

  return (
    <div
      style={{
        backgroundColor: "var(--color-card)",
        border: "var(--border-ink-thick)",
        borderRadius: "var(--radius-card)",
        boxShadow: shadows[elevation],
        padding: "1.75rem",
        ...style
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

