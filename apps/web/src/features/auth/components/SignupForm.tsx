import React, { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
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

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const { data, isLoading, error, isSuccess, executeSignup, reset } = useSignup();

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
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Badge variant="success">ACCOUNT CREATED</Badge>
          <span className="font-mono" style={{ fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-secondary)" }}>
            HTTP 201 CREATED
          </span>
        </div>

        <Alert variant="success" title={`Welcome to ${APP_CONFIG.name}`}>
          Your organization and primary administrative credentials have been securely provisioned.
        </Alert>

        <div
          style={{
            border: "var(--border-ink)",
            borderRadius: "var(--radius-card)",
            backgroundColor: "var(--color-muted)",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-base, 15px)" }}>
            <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm, 13px)" }}>Account Holder:</span>
            <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{data.fullName}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-base, 15px)" }}>
            <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm, 13px)" }}>Work Email:</span>
            <span style={{ color: "var(--color-text-primary)" }}>{data.email}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-base, 15px)" }}>
            <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm, 13px)" }}>Organization:</span>
            <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{data.companyName}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-base, 15px)" }}>
            <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm, 13px)" }}>Assigned Role:</span>
            <Badge variant="neutral">{data.role.replace("_", " ")}</Badge>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-base, 15px)" }}>
            <span style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-sm, 13px)" }}>User ID:</span>
            <span className="font-mono" style={{ fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-primary)" }}>{data.userId}</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "0.5rem" }}>
          <Button
            variant="primary"
            onClick={onSuccess}
            style={{ width: "100%" }}
          >
            <span>Proceed to Dashboard</span>
            <ArrowRightIcon size={16} />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              reset();
              setFormData({
                fullName: "",
                email: "",
                companyName: "",
                role: "hr_manager",
                password: "",
                confirmPassword: "",
                agreeToTerms: false
              });
            }}
          >
            Register Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Top Banner / Heading Context */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2, 8px)", marginBottom: "var(--space-2, 8px)" }}>
          <Badge variant="neutral">ENTERPRISE ONBOARDING</Badge>
          <span className="font-mono" style={{ fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-secondary)" }}>
            STAGE 01 / REGISTRATION
          </span>
        </div>
        <h2 style={{ margin: "0 0 0.35rem 0", fontSize: "var(--text-xl, 22px)", fontWeight: 600, lineHeight: "var(--leading-tight, 1.25)", color: "var(--color-text-primary)" }}>
          Create your organization account
        </h2>
        <p style={{ margin: 0, fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)", lineHeight: "var(--leading-normal, 1.5)" }}>
          Provision automated payroll rules, attendance tracking, and compliant contract management.
        </p>
      </div>

      {/* Semantic Error Alert */}
      {error && (
        <Alert variant="danger" title="Registration Failed">
          {error}
        </Alert>
      )}

      {/* Row 1: Full Name & Work Email */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4, 16px)" }}>
        <Input
          label="Full Legal Name"
          required
          placeholder="e.g. Sarah Connor"
          startAdornment={<UserIcon size={16} />}
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          disabled={isLoading}
        />
        <Input
          label="Work Email Address"
          type="email"
          required
          placeholder="sarah@company.com"
          startAdornment={<MailIcon size={16} />}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isLoading}
        />
      </div>

      {/* Row 2: Organization Name & Primary Role */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "var(--space-4, 16px)" }}>
        <Input
          label="Organization / Company Name"
          required
          placeholder="e.g. Acme Technologies Inc."
          startAdornment={<BuildingIcon size={16} />}
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          disabled={isLoading}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label
            style={{
              fontSize: "var(--font-size-label, 14px)",
              fontWeight: 500,
              color: "var(--color-text-primary)",
              display: "flex",
              alignItems: "center",
              marginBottom: "var(--space-1)"
            }}
          >
            <span>
              Primary Role
              <span style={{ color: "#ef4444", marginLeft: "4px", fontWeight: 600 }} aria-hidden="true">*</span>
            </span>
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "10px 12px",
              fontSize: "var(--font-size-input, 15px)",
              fontFamily: "var(--font-sans)",
              borderRadius: "var(--radius-input)",
              border: "var(--border-ink)",
              backgroundColor: "var(--color-card)",
              color: "var(--color-text-primary)",
              boxShadow: "inset 1px 1px 2px rgba(0, 0, 0, 0.05)",
              outline: "none",
              cursor: "pointer"
            }}
          >
            {APP_CONFIG.defaultRoles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Password & Confirm Password */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          placeholder="Min. 8 characters"
          startAdornment={<LockIcon size={16} />}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: "none",
                border: "none",
                padding: "2px",
                cursor: "pointer",
                color: "var(--color-subtle)",
                display: "flex"
              }}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
            </button>
          }
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          disabled={isLoading}
          helperText="Must be at least 8 characters long"
        />

        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          required
          placeholder="Re-enter password"
          startAdornment={<LockIcon size={16} />}
          endAdornment={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                background: "none",
                border: "none",
                padding: "2px",
                cursor: "pointer",
                color: "var(--color-subtle)",
                display: "flex"
              }}
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

      {/* Terms Agreement Checkbox */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "4px" }}>
        <input
          id="agreeToTerms"
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
          disabled={isLoading}
          style={{
            marginTop: "3px",
            width: "16px",
            height: "16px",
            accentColor: "var(--color-primary)",
            cursor: "pointer",
            border: "var(--border-ink)"
          }}
        />
        <label
          htmlFor="agreeToTerms"
          style={{
            fontSize: "var(--text-sm, 13px)",
            color: "var(--color-text-primary)",
            lineHeight: "var(--leading-normal, 1.5)",
            cursor: "pointer"
          }}
        >
          I accept the{" "}
          <span style={{ fontWeight: 600, textDecoration: "underline" }}>Enterprise Master Agreement</span> and{" "}
          <span style={{ fontWeight: 600, textDecoration: "underline" }}>Security Compliance Protocols</span>.
        </label>
      </div>

      {/* Form Submission Button */}
      <div style={{ marginTop: "var(--space-2, 8px)" }}>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          style={{ width: "100%", padding: "12px 18px", fontSize: "var(--font-size-button, 15px)" }}
        >
          <span>Complete Organization Registration</span>
          <ArrowRightIcon size={18} />
        </Button>
      </div>
    </form>
  );
};

