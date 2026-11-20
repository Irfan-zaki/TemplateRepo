import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { BrandMark } from "../components/ui/BrandMark";
import { Button } from "../components/ui/Button";
import { useAuth } from "./AuthProvider";
import { featureRoutes } from "./feature-registry";

/**
 * Full-bleed app shell (Odoo layout): one navbar across the whole page, then the
 * page content with no max-width, no outer card, and no side margin. Feature pages
 * decide their own inner spacing with --layout-gutter.
 */
export const AppShell: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const apiMode = import.meta.env.VITE_API_MODE ?? "real";
  const visibleFeatures = featureRoutes.filter((feature) => user && feature.roles.includes(user.role));

  if (!user) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: "var(--page)" }}>
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
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4, 16px)", minWidth: 0 }}>
          <BrandMark />
          <nav style={{ display: "flex", alignItems: "stretch", gap: "var(--space-1, 4px)" }}>
            {visibleFeatures.map((feature) => (
              <NavLink
                key={feature.id}
                to={`/app/${feature.path}`}
                className={({ isActive }) => (isActive ? "nav-link nav-link--active" : "nav-link")}
              >
                {feature.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3, 12px)" }}>
          <Badge variant={apiMode === "mock" ? "warning" : "success"}>{apiMode} mode</Badge>
          <span style={{ fontSize: "var(--text-sm, 13px)", color: "var(--text-muted)" }}>{user.fullName}</span>
          <Badge variant="neutral">{user.role}</Badge>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Sign out
          </Button>
        </div>
      </header>

      <main style={{ flex: 1, width: "100%", backgroundColor: "var(--page)" }}>
        <Outlet />
      </main>
    </div>
  );
};
