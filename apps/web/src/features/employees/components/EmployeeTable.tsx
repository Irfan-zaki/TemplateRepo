import React from "react";
import { Employee } from "../../../types/api";
import { Badge } from "../../../components/ui/Badge";

interface EmployeeTableProps {
  employees: Employee[];
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  if (employees.length === 0) {
    return (
      <div style={{ padding: "var(--space-8, 32px)", textAlign: "center", color: "var(--color-text-secondary)", fontSize: "var(--text-base, 15px)" }}>
        No employees found.
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--color-border)", backgroundColor: "var(--color-muted)" }}>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>ID</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Name</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Role</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Department</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Email</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Status</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Join Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td className="font-mono" style={{ padding: "12px", fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-primary)" }}>{emp.id}</td>
              <td style={{ padding: "12px", fontWeight: 600, fontSize: "var(--text-base, 15px)", color: "var(--color-text-primary)" }}>{emp.name}</td>
              <td style={{ padding: "12px", fontSize: "var(--text-base, 15px)", color: "var(--color-text-primary)" }}>{emp.role}</td>
              <td style={{ padding: "12px", fontSize: "var(--text-base, 15px)", color: "var(--color-text-primary)" }}>{emp.department}</td>
              <td style={{ padding: "12px", fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>{emp.email}</td>
              <td style={{ padding: "12px" }}>
                <Badge variant={emp.status === "active" ? "success" : "danger"}>
                  {emp.status}
                </Badge>
              </td>
              <td style={{ padding: "12px", fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>{emp.joinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

