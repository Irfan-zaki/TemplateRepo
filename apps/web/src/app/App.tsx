import React, { useState } from "react";
import { EmployeesPage } from "../features/employees/pages/EmployeesPage";
import { AttendancePage } from "../features/attendance/pages/AttendancePage";
import { TimeOffPage } from "../features/time-off/pages/TimeOffPage";
import { PayrollPage } from "../features/payroll/pages/PayrollPage";

type Tab = "employees" | "attendance" | "time-off" | "payroll";

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("employees");
  const apiMode = import.meta.env.VITE_API_MODE ?? "real";
  const isMockMode = apiMode === "mock";

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif", minHeight: "100vh", backgroundColor: "#f1f5f9" }}>
      {/* Rule 12: Visible DEVELOPMENT MOCK MODE indicator */}
      {isMockMode ? (
        <div
          style={{
            backgroundColor: "#ca8a04",
            color: "#ffffff",
            padding: "8px 16px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "0.875rem",
            letterSpacing: "0.05em",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          ⚠️ DEVELOPMENT MOCK MODE ENABLED &mdash; Requests intercepted by MSW (Mock Service Worker)
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#059669",
            color: "#ffffff",
            padding: "4px 16px",
            textAlign: "center",
            fontWeight: "500",
            fontSize: "0.75rem",
            letterSpacing: "0.05em"
          }}
        >
          🟢 REAL API MODE &mdash; Connected to Fastify Backend &amp; PostgreSQL
        </div>
      )}

      {/* Header */}
      <header
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.25rem", color: "#0f172a" }}>PeoplePay360</h1>
          <span
            style={{
              padding: "2px 8px",
              borderRadius: "4px",
              backgroundColor: isMockMode ? "#fef08a" : "#d1fae5",
              color: isMockMode ? "#854d0e" : "#065f46",
              fontSize: "0.75rem",
              fontWeight: 600,
              textTransform: "uppercase"
            }}
          >
            {apiMode} mode
          </span>
        </div>
        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
          Hackathon Architecture &bull; Central API Client Pattern
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav
        style={{
          display: "flex",
          gap: "1rem",
          padding: "0 2rem",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0"
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
                padding: "12px 16px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontWeight: isActive ? "600" : "400",
                color: isActive ? "#2563eb" : "#64748b",
                borderBottom: isActive ? "2px solid #2563eb" : "2px solid transparent",
                marginBottom: "-1px"
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main style={{ maxWidth: "1200px", margin: "2rem auto", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        {activeTab === "employees" && <EmployeesPage />}
        {activeTab === "attendance" && <AttendancePage />}
        {activeTab === "time-off" && <TimeOffPage />}
        {activeTab === "payroll" && <PayrollPage />}
      </main>
    </div>
  );
};

