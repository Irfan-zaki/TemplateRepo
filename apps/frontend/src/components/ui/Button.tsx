import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  style,
  className = "",
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  const baseStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--font-weight-button, 600)" as unknown as number,
    fontSize: size === "sm" ? "var(--text-sm, 13px)" : "var(--font-size-button, 15px)",
    padding: size === "sm" ? "6px var(--space-3, 12px)" : "10px var(--space-4, 16px)",
    borderRadius: "var(--radius-btn)",
    border: "var(--border-ink)",
    boxShadow: isDisabled ? "none" : "var(--shadow-hard)",
    cursor: isDisabled ? "not-allowed" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2, 8px)",
    transition: "var(--transition-press)",
    textDecoration: "none",
    opacity: isDisabled ? 0.6 : 1,
    outline: "none",
    ...style
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "var(--color-primary)",
      color: "#ffffff"
    },
    secondary: {
      backgroundColor: "var(--color-card)",
      color: "var(--color-text-primary)"
    },
    danger: {
      backgroundColor: "var(--color-danger)",
      color: "#ffffff"
    },
    outline: {
      backgroundColor: "transparent",
      color: "var(--color-text-primary)"
    }
  };

  return (
    <button
      disabled={isDisabled}
      style={{
        ...baseStyle,
        ...variantStyles[variant]
      }}
      className={`pressable ${className}`}
      onMouseDown={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.transform = "translate(1px, 1px)";
          e.currentTarget.style.boxShadow = "var(--shadow-hard-sm)";
        }
      }}
      onMouseUp={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "var(--shadow-hard)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "var(--shadow-hard)";
        }
      }}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            style={{
              width: "14px",
              height: "14px",
              border: "2px solid currentColor",
              borderTopColor: "transparent",
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin 0.6s linear infinite"
            }}
          />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

