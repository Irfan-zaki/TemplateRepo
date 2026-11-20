import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  id,
  style,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
      {label && (
        <label
          htmlFor={selectId}
          style={{
            fontSize: "var(--font-size-label, 14px)",
            fontWeight: 500,
            color: "var(--text)"
          }}
        >
          {label}
          {props.required && (
            <span style={{ color: "var(--danger)", marginLeft: "4px", fontWeight: 600 }} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <select
        id={selectId}
        style={{
          width: "100%",
          height: "var(--control-height)",
          padding: "0 12px",
          fontSize: "var(--font-size-input, 15px)",
          fontFamily: "var(--font-sans)",
          borderRadius: "var(--radius-input)",
          border: error ? "1px solid var(--danger)" : "var(--border-strong)",
          backgroundColor: "var(--card)",
          color: "var(--text)",
          cursor: "pointer",
          ...style
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div style={{ fontSize: "var(--text-sm, 13px)", fontWeight: 500, color: "var(--danger-text)" }}>{error}</div>
      )}
      {!error && helperText && (
        <div style={{ fontSize: "var(--font-size-secondary, 13px)", color: "var(--text-muted)" }}>{helperText}</div>
      )}
    </div>
  );
};
