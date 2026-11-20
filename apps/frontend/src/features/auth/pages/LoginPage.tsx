import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../../components/ui/Alert";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { useAuth } from "../../../app/AuthProvider";
import { AuthLayout } from "../components/AuthLayout";

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
    <AuthLayout headerLink={{ to: "/signup", label: "Create an account" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div>
          <h2 style={{ margin: "0 0 0.35rem", fontSize: "var(--text-xl, 22px)", fontWeight: 600 }}>Sign in</h2>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "var(--text-sm, 13px)" }}>
            Enter your details to continue.
          </p>
        </div>
        {error && (
          <Alert variant="danger" title="Sign in failed">
            {error}
          </Alert>
        )}
        <Input
          label="Work email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" isLoading={isLoading}>
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
};
