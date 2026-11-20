import React from "react";

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

/**
 * Odoo-style control panel: a full-width bar under the navbar with the page
 * title on the left and the page actions on the right.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, actions }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--space-4, 16px)",
        padding: "var(--space-3, 12px) var(--layout-gutter)",
        backgroundColor: "var(--page)",
        borderBottom: "var(--border-default)"
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h2
          style={{
            margin: 0,
            fontSize: "var(--text-xl, 22px)",
            fontWeight: 600,
            color: "var(--text)"
          }}
        >
          {title}
        </h2>
        {description && (
          <p style={{ margin: "2px 0 0", fontSize: "var(--text-sm, 13px)", color: "var(--text-muted)" }}>
            {description}
          </p>
        )}
      </div>
      {actions && <div style={{ display: "flex", gap: "var(--space-2, 8px)", flexShrink: 0 }}>{actions}</div>}
    </div>
  );
};
