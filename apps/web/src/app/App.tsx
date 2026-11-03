import React, { useState } from "react";
import { EmployeesPage } from "../features/employees/pages/EmployeesPage";
import { AttendancePage } from "../features/attendance/pages/AttendancePage";
import { TimeOffPage } from "../features/time-off/pages/TimeOffPage";
import { PayrollPage } from "../features/payroll/pages/PayrollPage";
import { SignupPage } from "../features/auth/pages/SignupPage";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

type ViewMode = "signup" | "dashboard";
type Tab = "employees" | "attendance" | "time-off" | "payroll";

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>("signup");
  const [activeTab, setActiveTab] = useState<Tab>("employees");

  const apiMode = import.meta.env.VITE_API_MODE ?? "real";
  const isMockMode = apiMode === "mock";

  // If in signup view, render the dedicated Neo-Brutalist Signup Page
  if (currentView === "signup") {
    return (
      <div>
        {/* DESIGN.md Section 2: Mode Banner with NO emoji, strict semantic tokens & ink border */}
        {isMockMode ? (
          <div
            style={{
              backgroundColor: "var(--color-warning-surface)",
              color: "var(--color-warning-text)",
              borderBottom: "var(--border-ink)",
              padding: "7px 16px",
              textAlign: "center",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase"
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
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase"
            }}
          >
            REAL API MODE &mdash; CONNECTED TO FASTIFY BACKEND &amp; POSTGRESQL
          </div>
        )}

        <SignupPage onNavigateToDashboard={() => setCurrentView("dashboard")} />
      </div>
    );
  }

  // Dashboard ERP Console View
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--color-canvas)" }}>
      {/* DESIGN.md Section 2: Strict Mode Banner with NO emoji */}
      {isMockMode ? (
        <div
          style={{
            backgroundColor: "var(--color-warning-surface)",
            color: "var(--color-warning-text)",
            borderBottom: "var(--border-ink)",
            padding: "7px 16px",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase"
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
            fontWeight: 700,
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            textTransform: "uppercase"
          }}
        >
          REAL API MODE &mdash; CONNECTED TO FASTIFY BACKEND &amp; POSTGRESQL
        </div>
      )}

      {/* Header with Neo-Brutalist Frame */}
      <header
        style={{
          backgroundColor: "var(--color-card)",
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
              width: "30px",
              height: "30px",
              backgroundColor: "var(--color-ink)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              fontWeight: 800,
              fontSize: "1rem",
              fontFamily: "var(--font-mono)"
            }}
          >
            P
          </div>
          <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "var(--color-ink)" }}>
            PeoplePay360
          </h1>
          <Badge variant={isMockMode ? "warning" : "success"}>
            {apiMode} mode
          </Badge>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className="font-mono" style={{ fontSize: "0.8125rem", color: "var(--color-subtle)" }}>
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

      {/* Navigation Tabs (DESIGN.md Section 7: Ink active underline, not blue) */}
      <nav
        style={{
          display: "flex",
          gap: "1.5rem",
          padding: "0 2rem",
          backgroundColor: "var(--color-card)",
          borderBottom: "var(--border-ink)"
        }}
      >
        {[
          { id: "employees", label: "Employees" },
          { id: "attendance", label: "Attendance" },
          { id: "time-off", label: "Time Off" },
          { id: "payroll", label: "Payroll" }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              style={{
                padding: "14px 4px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontWeight: isActive ? 700 : 500,
                fontSize: "0.875rem",
                fontFamily: "var(--font-sans)",
                color: isActive ? "var(--color-ink)" : "var(--color-subtle)",
                borderBottom: isActive ? "2px solid var(--color-ink)" : "2px solid transparent",
                marginBottom: "-1px",
                transition: "color 0.1s ease"
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Main Content Card (DESIGN.md Section 6: Hard shadow, ink frame) */}
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
        {activeTab === "employees" && <EmployeesPage />}
        {activeTab === "attendance" && <AttendancePage />}
        {activeTab === "time-off" && <TimeOffPage />}
        {activeTab === "payroll" && <PayrollPage />}
      </main>
    </div>
  );
};
