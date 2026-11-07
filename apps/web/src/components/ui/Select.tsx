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
            color: "var(--color-text-primary)"
          }}
        >
          {label}
          {props.required && (
            <span style={{ color: "var(--color-danger)", marginLeft: "4px", fontWeight: 600 }} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <select
        id={selectId}
        style={{
          width: "100%",
          padding: "10px 12px",
          fontSize: "var(--font-size-input, 15px)",
          fontFamily: "var(--font-sans)",
          borderRadius: "var(--radius-input)",
          border: error ? "1.5px solid var(--color-danger)" : "var(--border-ink)",
          backgroundColor: "var(--color-card)",
          color: "var(--color-text-primary)",
          boxShadow: "inset 1px 1px 2px rgba(0, 0, 0, 0.05)",
          outline: "none",
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
        <div style={{ fontSize: "var(--text-sm, 13px)", fontWeight: 500, color: "var(--color-danger-text)" }}>{error}</div>
      )}
      {!error && helperText && (
        <div style={{ fontSize: "var(--font-size-secondary, 13px)", color: "var(--color-text-secondary)" }}>{helperText}</div>
      )}
    </div>
  );
};
