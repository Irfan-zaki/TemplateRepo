import React from "react";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { SignupForm } from "../components/SignupForm";
import { ShieldCheckIcon } from "../../../components/ui/icons";

interface SignupPageProps {
  onNavigateToDashboard?: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigateToDashboard }) => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-canvas)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Top Navigation Strip */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "var(--color-primary)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              fontWeight: 800,
              fontSize: "1.125rem",
              fontFamily: "var(--font-mono)"
            }}
          >
            P
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.25rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)"
              }}
            >
              PeoplePay360
            </h1>
          </div>
          <Badge variant="neutral">ENTERPRISE CORE</Badge>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontSize: "0.875rem", color: "var(--color-subtle)" }}>
            Existing organization?
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onNavigateToDashboard}
          >
            Access ERP Console
          </Button>
        </div>
      </header>

      {/* Centered Main Content Area */}
      <main
        style={{
          flex: 1,
          maxWidth: "580px",
          width: "100%",
          margin: "2.5rem auto",
          padding: "0 1.25rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Card elevation="lg" style={{ border: "var(--border-ink-thick)" }}>
          <SignupForm onSuccess={onNavigateToDashboard} />
        </Card>

        <div
          style={{
            marginTop: "1.25rem",
            textAlign: "center",
            fontSize: "0.8125rem",
            color: "var(--color-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          <ShieldCheckIcon size={16} />
          <span>End-to-end encrypted connection &bull; ISO-27001 Audited</span>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer
        style={{
          borderTop: "1px solid #E5E7EB",
          backgroundColor: "var(--color-card)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.75rem",
          color: "var(--color-subtle)"
        }}
      >
        <div>&copy; 2026 PeoplePay360 Inc. All rights reserved.</div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span className="font-mono">V1.0.0-PROD</span>
        </div>
      </footer>
    </div>
  );
};
