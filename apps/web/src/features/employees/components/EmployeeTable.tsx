import React from "react";
import { Employee } from "../../../types/api";

interface EmployeeTableProps {
  employees: Employee[];
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  if (employees.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
        No employees found.
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Name</th>
            <th style={{ padding: "12px" }}>Role</th>
            <th style={{ padding: "12px" }}>Department</th>
            <th style={{ padding: "12px" }}>Email</th>
            <th style={{ padding: "12px" }}>Status</th>
            <th style={{ padding: "12px" }}>Join Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: "12px", fontFamily: "monospace" }}>{emp.id}</td>
              <td style={{ padding: "12px", fontWeight: "600" }}>{emp.name}</td>
              <td style={{ padding: "12px" }}>{emp.role}</td>
              <td style={{ padding: "12px" }}>{emp.department}</td>
              <td style={{ padding: "12px", color: "#4b5563" }}>{emp.email}</td>
              <td style={{ padding: "12px" }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "0.85rem",
                    backgroundColor: emp.status === "active" ? "#dcfce7" : "#fee2e2",
                    color: emp.status === "active" ? "#166534" : "#991b1b"
                  }}
                >
                  {emp.status}
                </span>
              </td>
              <td style={{ padding: "12px", color: "#64748b" }}>{emp.joinDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

