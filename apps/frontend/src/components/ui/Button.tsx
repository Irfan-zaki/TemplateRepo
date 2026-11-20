import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md";
  isLoading?: boolean;
}

/**
 * Styles live in styles/tokens.css (.btn, .btn--primary, ...) so hover, active,
 * and disabled states work. `primary` is filled with the secondary palette
 * colour (muted plum).
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className = "",
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      disabled={isDisabled}
      className={`btn btn--${variant} btn--${size} ${className}`.trim()}
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
