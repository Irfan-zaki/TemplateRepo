import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { APP_CONFIG } from "../config/app.config";
import { useAuth } from "./AuthProvider";
import { featureRoutes } from "./feature-registry";

export const AppShell: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const apiMode = import.meta.env.VITE_API_MODE ?? "real";
  const visibleFeatures = featureRoutes.filter((feature) => user && feature.roles.includes(user.role));

  if (!user) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, backgroundColor: "var(--color-canvas)" }}>
      <header
        style={{
          backgroundColor: "var(--color-card)",
          borderBottom: "var(--border-ink)",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem"
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
              fontSize: "var(--text-base, 15px)"
            }}
          >
            {APP_CONFIG.logoText}
          </div>
          <h1 style={{ margin: 0, fontSize: "var(--text-xl, 22px)", fontWeight: 700 }}>{APP_CONFIG.name}</h1>
          <Badge variant={apiMode === "mock" ? "warning" : "success"}>{apiMode} mode</Badge>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>{user.fullName}</span>
          <Badge variant="neutral">{user.role}</Badge>
          <Button
            variant="outline"
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

      <nav
        style={{
          display: "flex",
          gap: "1.5rem",
          padding: "0 2rem",
          backgroundColor: "var(--color-card)",
          borderBottom: "var(--border-ink)"
        }}
      >
        {visibleFeatures.map((feature) => (
          <NavLink
            key={feature.id}
            to={`/app/${feature.path}`}
            style={({ isActive }) => ({
              padding: "14px 4px",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 400,
              fontSize: "var(--text-base, 15px)",
              fontFamily: "var(--font-sans)",
              color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              borderBottom: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
              marginBottom: "-1px"
            })}
          >
            {feature.label}
          </NavLink>
        ))}
      </nav>

      <main
        style={{
          maxWidth: "1200px",
          width: "calc(100% - 2rem)",
          margin: "2rem auto",
          backgroundColor: "var(--color-card)",
          borderRadius: "var(--radius-card)",
          border: "var(--border-ink)",
          boxShadow: "var(--shadow-hard-lg)"
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
