import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, startAdornment, endAdornment, style, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: "var(--font-size-label, 14px)",
              fontWeight: "var(--font-weight-label, 500)" as unknown as number,
              color: "var(--color-text-primary)",
              display: "flex",
              alignItems: "center",
              marginBottom: "var(--space-1)"
            }}
          >
            <span>
              {label}
              {props.required && (
                <span style={{ color: "#ef4444", marginLeft: "4px", fontWeight: 600 }} aria-hidden="true">*</span>
              )}
            </span>
          </label>
        )}

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "100%"
          }}
        >
          {startAdornment && (
            <div
              style={{
                position: "absolute",
                left: "12px",
                display: "flex",
                alignItems: "center",
                color: "var(--color-subtle)",
                pointerEvents: "none"
              }}
            >
              {startAdornment}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            style={{
              width: "100%",
              padding: startAdornment
                ? "10px 12px 10px 38px"
                : endAdornment
                ? "10px 38px 10px 12px"
                : "10px 12px",
              fontSize: "var(--font-size-input, 15px)",
              fontWeight: "var(--font-weight-input, 400)" as unknown as number,
              fontFamily: "var(--font-sans)",
              borderRadius: "var(--radius-input)",
              border: error ? "1.5px solid var(--color-danger)" : "var(--border-ink)",
              backgroundColor: "var(--color-card)",
              color: "var(--color-text-primary)",
              boxShadow: "inset 1px 1px 2px rgba(0, 0, 0, 0.05)",
              outline: "none",
              transition: "border-color 0.15s ease",
              ...style
            }}
            {...props}
          />

          {endAdornment && (
            <div
              style={{
                position: "absolute",
                right: "10px",
                display: "flex",
                alignItems: "center",
                color: "var(--color-text-secondary)"
              }}
            >
              {endAdornment}
            </div>
          )}
        </div>

        {error && (
          <div
            style={{
              fontSize: "var(--text-sm, 13px)",
              fontWeight: 500,
              color: "var(--color-danger-text)",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            {error}
          </div>
        )}

        {!error && helperText && (
          <div
            style={{
              fontSize: "var(--font-size-secondary, 13px)",
              color: "var(--color-text-secondary)"
            }}
          >
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

