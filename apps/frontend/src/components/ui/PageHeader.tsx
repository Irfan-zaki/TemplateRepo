import React from "react";

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, actions }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "var(--space-4, 16px)",
        marginBottom: "var(--space-6, 24px)"
      }}
    >
      <div>
        <h2
          style={{
            margin: description ? "0 0 var(--space-2, 8px) 0" : 0,
            fontSize: "var(--text-2xl, 28px)",
            fontWeight: 600,
            color: "var(--color-text-primary)"
          }}
        >
          {title}
        </h2>
        {description && (
          <p style={{ margin: 0, fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)", maxWidth: "640px" }}>
            {description}
          </p>
        )}
      </div>
      {actions && <div style={{ display: "flex", gap: "var(--space-2, 8px)", flexShrink: 0 }}>{actions}</div>}
    </div>
  );
};
