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
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "var(--color-ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <span>{label}</span>
            {props.required && (
              <span style={{ fontSize: "0.75rem", color: "var(--color-danger)" }}>*required</span>
            )}
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
                ? "9px 12px 9px 38px"
                : endAdornment
                ? "9px 38px 9px 12px"
                : "9px 12px",
              fontSize: "0.875rem",
              fontFamily: "var(--font-sans)",
              borderRadius: "var(--radius-input)",
              border: error ? "1.5px solid var(--color-danger)" : "var(--border-ink)",
              backgroundColor: "var(--color-card)",
              color: "var(--color-ink)",
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
                color: "var(--color-subtle)"
              }}
            >
              {endAdornment}
            </div>
          )}
        </div>

        {error && (
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--color-danger)",
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
              fontSize: "0.75rem",
              color: "var(--color-subtle)"
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

