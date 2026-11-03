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
  ArrowRightIcon,
  CircleCheckIcon,
  ShieldCheckIcon
} from "../../../components/ui/icons";
import { useSignup } from "../hooks/useSignup";
import { SignupInput } from "../types";

interface SignupFormProps {
  onSuccess?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess }) => {
  const { data, isLoading, error, isSuccess, executeSignup, reset } = useSignup();

  const [formData, setFormData] = useState<SignupInput>({
    fullName: "",
    email: "",
    companyName: "",
    role: "hr_manager",
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
          <span style={{ fontSize: "0.75rem", color: "var(--color-subtle)", fontFamily: "var(--font-mono)" }}>
            HTTP 201 CREATED
          </span>
        </div>

        <Alert variant="success" title="Welcome to PeoplePay360">
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
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
            <span style={{ color: "var(--color-subtle)" }}>Account Holder:</span>
            <span style={{ fontWeight: 600 }}>{data.fullName}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
            <span style={{ color: "var(--color-subtle)" }}>Work Email:</span>
            <span className="font-mono">{data.email}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
            <span style={{ color: "var(--color-subtle)" }}>Organization:</span>
            <span style={{ fontWeight: 600 }}>{data.companyName}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
            <span style={{ color: "var(--color-subtle)" }}>Assigned Role:</span>
            <Badge variant="neutral">{data.role.replace("_", " ")}</Badge>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem" }}>
            <span style={{ color: "var(--color-subtle)" }}>User ID:</span>
            <span className="font-mono" style={{ fontSize: "0.8125rem" }}>{data.userId}</span>
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.5rem" }}>
          <Badge variant="neutral">ENTERPRISE ONBOARDING</Badge>
          <span style={{ fontSize: "0.75rem", color: "var(--color-subtle)", fontFamily: "var(--font-mono)" }}>
            STAGE 01 / REGISTRATION
          </span>
        </div>
        <h2 style={{ margin: "0 0 0.35rem 0", fontSize: "1.375rem", fontWeight: 700, color: "var(--color-ink)" }}>
          Create your organization account
        </h2>
        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-subtle)" }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "1rem" }}>
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
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--color-ink)",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <span>Primary Role</span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-danger)" }}>*required</span>
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as SignupInput["role"] })}
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "9px 12px",
              fontSize: "0.875rem",
              fontFamily: "var(--font-sans)",
              borderRadius: "var(--radius-input)",
              border: "var(--border-ink)",
              backgroundColor: "var(--color-card)",
              color: "var(--color-ink)",
              boxShadow: "inset 1px 1px 2px rgba(0, 0, 0, 0.05)",
              outline: "none",
              cursor: "pointer"
            }}
          >
            <option value="hr_manager">HR Manager</option>
            <option value="payroll_officer">Payroll Officer</option>
            <option value="admin">System Administrator</option>
            <option value="employee">Standard Employee</option>
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

      {/* Password Requirements Checklist (Neo-minimalist) */}
      <div
        style={{
          padding: "10px 14px",
          backgroundColor: "var(--color-muted)",
          border: "var(--border-ink)",
          borderRadius: "var(--radius-card)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "var(--color-subtle)"
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "2px",
              border: "1px solid var(--color-ink)",
              backgroundColor: formData.password.length >= 8 ? "var(--color-success)" : "transparent",
              display: "inline-block"
            }}
          />
          8+ Characters
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "2px",
              border: "1px solid var(--color-ink)",
              backgroundColor:
                formData.password && formData.password === formData.confirmPassword
                  ? "var(--color-success)"
                  : "transparent",
              display: "inline-block"
            }}
          />
          Passwords Match
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <ShieldCheckIcon size={14} />
          Encrypted Storage
        </span>
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
            fontSize: "0.8125rem",
            color: "var(--color-ink)",
            lineHeight: 1.4,
            cursor: "pointer"
          }}
        >
          I accept the{" "}
          <span style={{ fontWeight: 600, textDecoration: "underline" }}>Enterprise Master Agreement</span> and{" "}
          <span style={{ fontWeight: 600, textDecoration: "underline" }}>Payroll Compliance Protocols</span>.
        </label>
      </div>

      {/* Form Submission Button */}
      <div style={{ marginTop: "0.5rem" }}>
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isLoading}
          style={{ width: "100%", padding: "12px 18px", fontSize: "0.9375rem" }}
        >
          <span>Complete Organization Registration</span>
          <ArrowRightIcon size={18} />
        </Button>
      </div>

      {/* Monospace Footer Stamp */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.75rem",
          color: "var(--color-subtle)",
          borderTop: "1px solid #e2e8f0",
          paddingTop: "12px",
          marginTop: "4px"
        }}
      >
        <span className="font-mono">SECURITY: ISO-27001 AUDITED</span>
        <span className="font-mono">PEOPLEPAY360 CORE ENGINE</span>
      </div>
    </form>
  );
};

