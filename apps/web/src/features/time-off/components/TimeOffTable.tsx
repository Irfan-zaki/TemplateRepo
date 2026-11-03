import React from "react";
import { TimeOffRequest } from "../../../types/api";
import { Badge } from "../../../components/ui/Badge";

interface TimeOffTableProps {
  requests: TimeOffRequest[];
}

export const TimeOffTable: React.FC<TimeOffTableProps> = ({ requests }) => {
  if (requests.length === 0) {
    return (
      <div style={{ padding: "var(--space-8, 32px)", textAlign: "center", color: "var(--color-text-secondary)", fontSize: "var(--text-base, 15px)" }}>
        No time-off requests found.
      </div>
    );
  }

  const getBadgeVariant = (status: TimeOffRequest["status"]) => {
    switch (status) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "danger";
      default:
        return "neutral";
    }
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontFamily: "var(--font-sans)" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid var(--color-border)", backgroundColor: "var(--color-muted)" }}>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>ID</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Employee</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Type</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Dates</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Days</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Reason</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td className="font-mono" style={{ padding: "12px", fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-primary)" }}>{req.id}</td>
              <td style={{ padding: "12px", fontWeight: 600, fontSize: "var(--text-base, 15px)", color: "var(--color-text-primary)" }}>{req.employeeName}</td>
              <td style={{ padding: "12px", fontSize: "var(--text-base, 15px)", textTransform: "capitalize", color: "var(--color-text-primary)" }}>{req.leaveType}</td>
              <td style={{ padding: "12px", fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>
                {req.startDate} to {req.endDate}
              </td>
              <td className="font-mono" style={{ padding: "12px", fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-primary)" }}>{req.days}</td>
              <td style={{ padding: "12px", fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>{req.reason}</td>
              <td style={{ padding: "12px" }}>
                <Badge variant={getBadgeVariant(req.status)}>
                  {req.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

