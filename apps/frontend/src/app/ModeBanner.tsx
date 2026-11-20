import React from "react";

/**
 * Shows a strip only in development mock mode (AGENTS.md rule 12).
 * Real mode shows its status as the navbar badge instead, so no strip is rendered.
 */
export const ModeBanner: React.FC = () => {
  const isMockMode = (import.meta.env.VITE_API_MODE ?? "real") === "mock";

  if (!isMockMode) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--warning-bg)",
        color: "var(--warning-text)",
        borderBottom: "var(--border-default)",
        padding: "7px 16px",
        textAlign: "center",
        fontWeight: 600,
        fontSize: "var(--text-xs, 12px)",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        fontFamily: "var(--font-sans)"
      }}
    >
      Development mock mode active — requests intercepted by MSW
    </div>
  );
};
