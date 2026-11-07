import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../../../components/ui/Alert";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { Card } from "../../../components/ui/Card";
import { Input } from "../../../components/ui/Input";
import { APP_CONFIG } from "../../../config/app.config";
import { useAuth } from "../../../app/AuthProvider";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@starter.dev");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    const message = await login({ email, password });
    setIsLoading(false);
    if (message) {
      setError(message);
      return;
    }
    navigate("/app/records");
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
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
              borderRadius: "var(--radius-badge)",
              fontWeight: 700
            }}
          >
            {APP_CONFIG.logoText}
          </div>
          <h1 style={{ margin: 0, fontSize: "var(--text-xl, 22px)", fontWeight: 700 }}>{APP_CONFIG.name}</h1>
        </div>
        <Link to="/signup" style={{ color: "var(--color-text-primary)", fontWeight: 600, fontSize: "var(--text-sm, 13px)" }}>
          Create an account
        </Link>
      </header>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.25rem" }}>
        <div style={{ width: "min(480px, 100%)" }}>
          <Card elevation="lg">
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <Badge variant="neutral">SIGN IN</Badge>
                <h2 style={{ margin: "0.75rem 0 0.35rem", fontSize: "var(--text-xl, 22px)" }}>Open the workspace</h2>
                <p style={{ margin: 0, color: "var(--color-text-secondary)", fontSize: "var(--text-sm, 13px)" }}>
                  Seeded demo accounts and the shared password are in docs/SETUP.md.
                </p>
              </div>
              {error && (
                <Alert variant="danger" title="Sign in failed">
                  {error}
                </Alert>
              )}
              <Input label="Work email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button type="submit" isLoading={isLoading}>
                Sign in
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};
