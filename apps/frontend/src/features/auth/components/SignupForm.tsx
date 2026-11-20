import React, { useState } from "react";
import { useAuth } from "../../../app/AuthProvider";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { Alert } from "../../../components/ui/Alert";
import { Badge } from "../../../components/ui/Badge";
import {
  UserIcon,
  MailIcon,
  BuildingIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon
} from "../../../components/ui/icons";
import { useSignup } from "../hooks/useSignup";
import { SignupInput } from "../types";
import { APP_CONFIG } from "../../../config/app.config";

interface SignupFormProps {
  onSuccess?: () => void;
}

const revealButtonStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: "2px",
  cursor: "pointer",
  color: "var(--text-muted)",
  display: "flex"
};

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const { establishSession } = useAuth();
  const { data, isLoading, error, isSuccess, executeSignup } = useSignup();

  const [formData, setFormData] = useState<SignupInput>({
    fullName: "",
    email: "",
    companyName: "",
    role: APP_CONFIG.defaultRoles[0]?.value || "admin",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeSignup(formData);
  };

  if (isSuccess && data) {
    const summary: { label: string; value: React.ReactNode }[] = [
      { label: "Name", value: data.fullName },
      { label: "Email", value: data.email },
      { label: "Company", value: data.companyName },
      { label: "Role", value: <Badge variant="neutral">{data.role.replace("_", " ")}</Badge> }
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div>
          <h2 style={{ margin: "0 0 0.35rem", fontSize: "var(--text-xl, 22px)", fontWeight: 600 }}>Account created</h2>
          <p style={{ margin: 0, fontSize: "var(--text-sm, 13px)", color: "var(--text-muted)" }}>
            Welcome to {APP_CONFIG.name}. Your account is ready.
          </p>
        </div>

        <div
          style={{
            border: "var(--border-default)",
            borderRadius: "var(--radius-card)",
            backgroundColor: "var(--section)",
            padding: "var(--space-4, 16px)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3, 12px)"
          }}
        >
          {summary.map((row) => (
            <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--space-4, 16px)" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "var(--text-sm, 13px)" }}>{row.label}</span>
              <span style={{ fontWeight: 600, color: "var(--text)" }}>{row.value}</span>
            </div>
          ))}
        </div>

        <Button
          variant="primary"
          onClick={() => {
            if (data?.token) establishSession(data);
            onSuccess?.();
          }}
          style={{ width: "100%" }}
        >
          <span>Continue</span>
          <ArrowRightIcon size={16} />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <h2 style={{ margin: "0 0 0.35rem", fontSize: "var(--text-xl, 22px)", fontWeight: 600 }}>Create your account</h2>
        <p style={{ margin: 0, fontSize: "var(--text-sm, 13px)", color: "var(--text-muted)" }}>
          Get started with {APP_CONFIG.name}.
        </p>
      </div>

      {error && (
        <Alert variant="danger" title="Could not create account">
          {error}
        </Alert>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4, 16px)" }}>
        <Input
          label="Full name"
          required
          autoComplete="name"
          startAdornment={<UserIcon size={16} />}
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          disabled={isLoading}
        />
        <Input
          label="Work email"
          type="email"
          required
          autoComplete="email"
          placeholder="name@company.com"
          startAdornment={<MailIcon size={16} />}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "var(--space-4, 16px)" }}>
        <Input
          label="Company"
          required
          autoComplete="organization"
          startAdornment={<BuildingIcon size={16} />}
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          disabled={isLoading}
        />
        <Select
          label="Role"
          required
          value={formData.role}
          onChange={(event) => setFormData({ ...formData, role: event.target.value })}
          disabled={isLoading}
          options={APP_CONFIG.defaultRoles}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4, 16px)" }}>
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          autoComplete="new-password"
          startAdornment={<LockIcon size={16} />}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={revealButtonStyle}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          }
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          disabled={isLoading}
          helperText="At least 8 characters"
        />
        <Input
          label="Confirm password"
          type={showConfirmPassword ? "text" : "password"}
          required
          autoComplete="new-password"
          startAdornment={<LockIcon size={16} />}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={revealButtonStyle}
              title={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          }
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          disabled={isLoading}
        />
      </div>

      <label
        htmlFor="agreeToTerms"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "var(--text-sm, 13px)",
          color: "var(--text)",
          cursor: "pointer"
        }}
      >
        <input
          id="agreeToTerms"
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
          disabled={isLoading}
          style={{ width: "16px", height: "16px", accentColor: "var(--brand)", cursor: "pointer" }}
        />
        I agree to the Terms of Service and Privacy Policy
      </label>

      <Button type="submit" variant="primary" isLoading={isLoading} style={{ width: "100%" }}>
        <span>Create account</span>
        <ArrowRightIcon size={16} />
      </Button>
    </form>
  );
};
