import React from "react";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { SignupForm } from "../components/SignupForm";
import { ShieldCheckIcon } from "../../../components/ui/icons";
import { APP_CONFIG } from "../../../config/app.config";

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
              borderRadius: "var(--radius-badge, 4px)",
              fontWeight: 700,
              fontSize: "var(--text-lg, 18px)",
              fontFamily: "var(--font-sans)"
            }}
          >
            {APP_CONFIG.logoText}
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "var(--text-xl, 22px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--color-text-primary)"
              }}
            >
              {APP_CONFIG.name}
            </h1>
          </div>
          <Badge variant="neutral">{APP_CONFIG.tagline.toUpperCase()}</Badge>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3, 12px)" }}>
          <span style={{ fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>
            Existing workspace?
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={onNavigateToDashboard}
          >
            Access Dashboard
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
            marginTop: "var(--space-4, 16px)",
            textAlign: "center",
            fontSize: "var(--text-sm, 13px)",
            color: "var(--color-text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-2, 8px)"
          }}
        >
          <ShieldCheckIcon size={16} />
          <span>End-to-end encrypted connection &bull; {APP_CONFIG.securityLabel}</span>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--color-border)",
          backgroundColor: "var(--color-surface)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "var(--text-xs, 12px)",
          color: "var(--color-text-secondary)"
        }}
      >
        <div>&copy; {new Date().getFullYear()} {APP_CONFIG.name} Inc. All rights reserved.</div>
        <div style={{ display: "flex", gap: "var(--space-4, 16px)" }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span className="font-mono">{APP_CONFIG.version.toUpperCase()}</span>
        </div>
      </footer>
    </div>
  );
};
