import React, { useState } from "react";
import { SignupPage } from "../features/auth/pages/SignupPage";
import { RecordsPage } from "../features/records/pages/RecordsPage";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { APP_CONFIG } from "../config/app.config";

type ViewMode = "signup" | "dashboard";

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>("signup");
  const [activeTab, setActiveTab] = useState<string>(APP_CONFIG.navigation[0]?.id ?? "records");

  const apiMode = import.meta.env.VITE_API_MODE ?? "real";
  const isMockMode = apiMode === "mock";

  // If in signup view, render the dedicated Neo-Brutalist Signup Page
  if (currentView === "signup") {
    return (
      <div>
        {/* Strict Mode Banner with NO emoji, strict semantic tokens & ink border */}
        {isMockMode ? (
          <div
            style={{
              backgroundColor: "var(--color-warning-surface)",
              color: "var(--color-warning-text)",
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
            DEVELOPMENT MOCK MODE ACTIVE &mdash; REQUESTS INTERCEPTED BY MSW SERVICE WORKER
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "var(--color-success-surface)",
              color: "var(--color-success-text)",
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
            REAL API MODE &mdash; CONNECTED TO FASTIFY BACKEND &amp; POSTGRESQL
          </div>
        )}

        <SignupPage onNavigateToDashboard={() => setCurrentView("dashboard")} />
      </div>
    );
  }

  // Dashboard Console View
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-canvas)" }}>
      {/* Strict Mode Banner with NO emoji */}
      {isMockMode ? (
        <div
          style={{
            backgroundColor: "var(--color-warning-surface)",
            color: "var(--color-warning-text)",
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
          DEVELOPMENT MOCK MODE ACTIVE &mdash; REQUESTS INTERCEPTED BY MSW SERVICE WORKER
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "var(--color-success-surface)",
            color: "var(--color-success-text)",
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
          REAL API MODE &mdash; CONNECTED TO FASTIFY BACKEND &amp; POSTGRESQL
        </div>
      )}

      {/* Header with Neo-Brutalist Frame */}
      <header
        style={{
          backgroundColor: "var(--color-surface)",
          borderBottom: "var(--border-ink)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "var(--radius-badge, 4px)",
              fontWeight: 700,
              fontSize: "var(--text-base, 15px)",
              fontFamily: "var(--font-sans)"
            }}
          >
            {APP_CONFIG.logoText}
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "var(--text-xl, 22px)", fontWeight: 700, color: "var(--color-text-primary)" }}>
              {APP_CONFIG.name}
            </h1>
          </div>
          <Badge variant={isMockMode ? "warning" : "success"}>
            {apiMode} mode
          </Badge>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className="font-mono" style={{ fontSize: "var(--text-xs, 12px)", color: "var(--color-text-secondary)" }}>
            ONE API &bull; TWO DATA SOURCES
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentView("signup")}
          >
            View Signup Page
          </Button>
        </div>
      </header>

      {/* Navigation Tabs (Primary active underline) */}
      <nav
        style={{
          display: "flex",
          gap: "1.5rem",
          padding: "0 2rem",
          backgroundColor: "var(--color-surface)",
          borderBottom: "var(--border-ink)"
        }}
      >
        {APP_CONFIG.navigation.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "14px 4px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontWeight: isActive ? 600 : 400,
                fontSize: "var(--text-base, 15px)",
                fontFamily: "var(--font-sans)",
                color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                borderBottom: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
                marginBottom: "-1px",
                transition: "color 0.1s ease"
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Main Content Card */}
      <main
        style={{
          maxWidth: "1200px",
          margin: "2rem auto",
          backgroundColor: "var(--color-card)",
          borderRadius: "var(--radius-card)",
          border: "var(--border-ink)",
          boxShadow: "var(--shadow-hard-lg)"
        }}
      >
        {activeTab === "records" && <RecordsPage />}
      </main>
    </div>
  );
};
