import React from "react";
import { SalaryRule, Payrun } from "../../../types/api";

interface PayrollTableProps {
  rules: SalaryRule[];
  payruns: Payrun[];
}

export const PayrollTable: React.FC<PayrollTableProps> = ({ rules, payruns }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Payruns Section */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0" }}>Payrun Cycles</h3>
        {payruns.length === 0 ? (
          <p style={{ color: "#666" }}>No payrun records found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                <th style={{ padding: "12px" }}>ID</th>
                <th style={{ padding: "12px" }}>Period</th>
                <th style={{ padding: "12px" }}>Dates</th>
                <th style={{ padding: "12px" }}>Employees</th>
                <th style={{ padding: "12px" }}>Total Gross</th>
                <th style={{ padding: "12px" }}>Total Net</th>
                <th style={{ padding: "12px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {payruns.map((pr) => (
                <tr key={pr.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px", fontFamily: "monospace" }}>{pr.id}</td>
                  <td style={{ padding: "12px", fontWeight: "600" }}>{pr.period}</td>
                  <td style={{ padding: "12px", color: "#64748b" }}>
                    {pr.startDate} to {pr.endDate}
                  </td>
                  <td style={{ padding: "12px" }}>{pr.totalEmployees}</td>
                  <td style={{ padding: "12px", fontFamily: "monospace" }}>${pr.totalGross.toLocaleString()}</td>
                  <td style={{ padding: "12px", fontFamily: "monospace", fontWeight: "600" }}>
                    ${pr.totalNet.toLocaleString()}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "0.85rem",
                        textTransform: "capitalize",
                        backgroundColor: pr.status === "paid" ? "#dcfce7" : "#fef9c3",
                        color: pr.status === "paid" ? "#166534" : "#854d0e"
                      }}
                    >
                      {pr.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Salary Rules Section */}
      <div>
        <h3 style={{ margin: "0 0 1rem 0" }}>Salary Rules & Allowances</h3>
        {rules.length === 0 ? (
          <p style={{ color: "#666" }}>No salary rules configured.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
                <th style={{ padding: "12px" }}>Code</th>
                <th style={{ padding: "12px" }}>Rule Name</th>
                <th style={{ padding: "12px" }}>Category</th>
                <th style={{ padding: "12px" }}>Type</th>
                <th style={{ padding: "12px" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px", fontFamily: "monospace", fontWeight: "bold" }}>{rule.code}</td>
                  <td style={{ padding: "12px" }}>{rule.name}</td>
                  <td style={{ padding: "12px", textTransform: "capitalize" }}>{rule.category}</td>
                  <td style={{ padding: "12px", textTransform: "capitalize" }}>{rule.type}</td>
                  <td style={{ padding: "12px", fontFamily: "monospace" }}>
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

