import React from "react";

export const ModeBanner: React.FC = () => {
  const isMockMode = (import.meta.env.VITE_API_MODE ?? "real") === "mock";

  return (
    <div
      style={{
        backgroundColor: isMockMode ? "var(--color-warning-surface)" : "var(--color-success-surface)",
        color: isMockMode ? "var(--color-warning-text)" : "var(--color-success-text)",
        borderBottom: "var(--border-ink)",
        padding: "7px 16px",
        textAlign: "center",
        fontWeight: 600,
        fontSize: "var(--text-xs, 12px)",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        fontFamily: "var(--font-sans)"
      }}
    >
      {isMockMode
        ? "Development mock mode active — requests intercepted by MSW"
        : "Real API mode — connected to Fastify and PostgreSQL"}
    </div>
  );
};
