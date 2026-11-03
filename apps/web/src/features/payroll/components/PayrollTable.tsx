import React from "react";
import { SalaryRule, Payrun } from "../../../types/api";
import { Badge } from "../../../components/ui/Badge";

interface PayrollTableProps {
  rules: SalaryRule[];
  payruns: Payrun[];
}

export const PayrollTable: React.FC<PayrollTableProps> = ({ rules, payruns }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8, 32px)", fontFamily: "var(--font-sans)" }}>
      {/* Payruns Section */}
      <div>
        <h3 style={{ margin: "0 0 var(--space-4, 16px) 0", fontSize: "var(--text-lg, 18px)", fontWeight: 600, color: "var(--color-text-primary)" }}>
          Payrun Cycles
        </h3>
        {payruns.length === 0 ? (
          <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-base, 15px)" }}>No payrun records found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)", backgroundColor: "var(--color-muted)" }}>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>ID</th>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Period</th>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Dates</th>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Employees</th>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Total Gross</th>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Total Net</th>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payruns.map((pr) => (
                <tr key={pr.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td className="font-mono" style={{ padding: "12px", fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-primary)" }}>{pr.id}</td>
                  <td style={{ padding: "12px", fontWeight: 600, fontSize: "var(--text-base, 15px)", color: "var(--color-text-primary)" }}>{pr.period}</td>
                  <td style={{ padding: "12px", fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>
                    {pr.startDate} to {pr.endDate}
                  </td>
                  <td className="font-mono" style={{ padding: "12px", fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-primary)" }}>{pr.totalEmployees}</td>
                  <td className="font-mono" style={{ padding: "12px", fontSize: "var(--text-base, 15px)", color: "var(--color-text-primary)" }}>${pr.totalGross.toLocaleString()}</td>
                  <td className="font-mono" style={{ padding: "12px", fontWeight: 600, fontSize: "var(--text-base, 15px)", color: "var(--color-text-primary)" }}>
                    ${pr.totalNet.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <Badge variant={pr.status === "paid" ? "success" : "warning"}>
                      {pr.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Salary Rules Section */}
      <div>
        <h3 style={{ margin: "0 0 var(--space-4, 16px) 0", fontSize: "var(--text-lg, 18px)", fontWeight: 600, color: "var(--color-text-primary)" }}>
          Salary Rules &amp; Allowances
        </h3>
        {rules.length === 0 ? (
          <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-base, 15px)" }}>No salary rules configured.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-border)", backgroundColor: "var(--color-muted)" }}>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Code</th>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Rule Name</th>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Category</th>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Type</th>
                <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td className="font-mono" style={{ padding: "12px", fontWeight: 600, fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-primary)" }}>{rule.code}</td>
                  <td style={{ padding: "12px", fontSize: "var(--text-base, 15px)", color: "var(--color-text-primary)" }}>{rule.name}</td>
                  <td style={{ padding: "12px", textTransform: "capitalize", fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>{rule.category}</td>
                  <td style={{ padding: "12px", textTransform: "capitalize", fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>{rule.type}</td>
                  <td className="font-mono" style={{ padding: "12px", fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-primary)" }}>
                    {rule.type === "fixed" ? `$${rule.amount}` : `${rule.amount}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

