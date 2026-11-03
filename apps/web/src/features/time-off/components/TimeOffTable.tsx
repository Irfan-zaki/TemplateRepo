import React from "react";
import { TimeOffRequest } from "../../../types/api";

interface TimeOffTableProps {
  requests: TimeOffRequest[];
}

export const TimeOffTable: React.FC<TimeOffTableProps> = ({ requests }) => {
  if (requests.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
        No time-off requests found.
      </div>
    );
  }

  const getStatusColor = (status: TimeOffRequest["status"]) => {
    switch (status) {
      case "approved":
        return { bg: "#dcfce7", text: "#166534" };
      case "pending":
        return { bg: "#fef9c3", text: "#854d0e" };
      case "rejected":
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
            <th style={{ padding: "12px" }}>Type</th>
            <th style={{ padding: "12px" }}>Dates</th>
            <th style={{ padding: "12px" }}>Days</th>
            <th style={{ padding: "12px" }}>Reason</th>
            <th style={{ padding: "12px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => {
            const colors = getStatusColor(req.status);
            return (
              <tr key={req.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "12px", fontFamily: "monospace" }}>{req.id}</td>
                <td style={{ padding: "12px", fontWeight: "600" }}>{req.employeeName}</td>
                <td style={{ padding: "12px", textTransform: "capitalize" }}>{req.leaveType}</td>
                <td style={{ padding: "12px", color: "#64748b" }}>
                  {req.startDate} to {req.endDate}
                </td>
                <td style={{ padding: "12px" }}>{req.days}</td>
                <td style={{ padding: "12px", color: "#4b5563" }}>{req.reason}</td>
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
                    {req.status}
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

