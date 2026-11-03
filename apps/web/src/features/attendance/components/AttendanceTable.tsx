import React from "react";
import { AttendanceRecord } from "../../../types/api";

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ records }) => {
  if (records.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
        No attendance records found.
      </div>
    );
  }

  const getStatusColor = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "present":
        return { bg: "#dcfce7", text: "#166534" };
      case "late":
        return { bg: "#fef9c3", text: "#854d0e" };
      case "half_day":
        return { bg: "#ffedd5", text: "#9a3412" };
      case "absent":
        return { bg: "#fee2e2", text: "#991b1b" };
      default:
        return { bg: "#f1f5f9", text: "#475569" };
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Employee</th>
            <th style={{ padding: "12px" }}>Date</th>
            <th style={{ padding: "12px" }}>Check In</th>
            <th style={{ padding: "12px" }}>Check Out</th>
            <th style={{ padding: "12px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => {
            const colors = getStatusColor(rec.status);
            return (
              <tr key={rec.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "12px", fontFamily: "monospace" }}>{rec.id}</td>
                <td style={{ padding: "12px", fontWeight: "600" }}>{rec.employeeName}</td>
                <td style={{ padding: "12px", color: "#64748b" }}>{rec.date}</td>
                <td style={{ padding: "12px" }}>{rec.checkIn}</td>
                <td style={{ padding: "12px" }}>{rec.checkOut ?? "—"}</td>
                <td style={{ padding: "12px" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "0.85rem",
                      textTransform: "capitalize",
                      backgroundColor: colors.bg,
                      color: colors.text
                    }}
                  >
                    {rec.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

