import React from "react";
import { APP_CONFIG } from "../../config/app.config";

/** Logo square (plum) plus the app name. Used by the app navbar and the auth header. */
export const BrandMark: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <div
      style={{
        width: "28px",
        height: "28px",
        backgroundColor: "var(--brand)",
        color: "var(--on-brand)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-btn)",
        fontWeight: 700,
        fontSize: "var(--text-base, 15px)"
      }}
    >
      {APP_CONFIG.logoText}
    </div>
    <span style={{ fontSize: "var(--text-lg, 18px)", fontWeight: 700, color: "var(--text)" }}>
      {APP_CONFIG.name}
    </span>
  </div>
);
