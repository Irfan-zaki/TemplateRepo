import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, style, className = "", ...props }) => {
  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        border: "var(--border-default)",
        borderRadius: "var(--radius-card)",
        padding: "1.75rem",
        ...style
      }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};
