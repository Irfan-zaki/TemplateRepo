import React from "react";
import { Link } from "react-router-dom";
import { BrandMark } from "../../../components/ui/BrandMark";
import { Card } from "../../../components/ui/Card";
import { APP_CONFIG } from "../../../config/app.config";

interface AuthLayoutProps {
  children: React.ReactNode;
  /** Link shown on the right of the header, e.g. "Create an account". */
  headerLink: { to: string; label: string; prefix?: string };
  /** "wide" is used by the signup form (two-column fields). */
  width?: "default" | "wide";
  /** Optional note rendered under the card. */
  belowCard?: React.ReactNode;
}

/**
 * Shared auth page frame. The header, page background, and footer are full-bleed
 * (edge to edge). Only the form card is width-limited, because forms should not stretch.
 */
export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, headerLink, width = "default", belowCard }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "var(--page)" }}>
    <header
      style={{
        backgroundColor: "var(--page)",
        borderBottom: "var(--border-default)",
        padding: "0 var(--layout-gutter)",
        minHeight: "var(--navbar-height)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "var(--space-4, 16px)"
      }}
    >
      <BrandMark />
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2, 8px)", fontSize: "var(--text-sm, 13px)" }}>
        {headerLink.prefix && <span style={{ color: "var(--text-muted)" }}>{headerLink.prefix}</span>}
        <Link to={headerLink.to} style={{ fontWeight: 600 }}>
          {headerLink.label}
        </Link>
      </div>
    </header>

    <main
      style={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-8, 32px) var(--layout-gutter)"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: width === "wide" ? "var(--auth-card-width-wide)" : "var(--auth-card-width)"
        }}
      >
        <Card>{children}</Card>
        {belowCard && (
          <div
            style={{
              marginTop: "var(--space-4, 16px)",
              textAlign: "center",
              fontSize: "var(--text-sm, 13px)",
              color: "var(--text-muted)"
            }}
          >
            {belowCard}
          </div>
        )}
      </div>
    </main>

    <footer
      style={{
        borderTop: "var(--border-default)",
        backgroundColor: "var(--page)",
        padding: "var(--space-3, 12px) var(--layout-gutter)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "var(--text-xs, 12px)",
        color: "var(--text-muted)"
      }}
    >
      <div>
        &copy; {new Date().getFullYear()} {APP_CONFIG.name}
      </div>
    </footer>
  </div>
);
