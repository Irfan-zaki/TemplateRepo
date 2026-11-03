import React from "react";
import { AttendanceRecord } from "../../../types/api";
import { Badge } from "../../../components/ui/Badge";

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ records }) => {
  if (records.length === 0) {
    return (
      <div style={{ padding: "var(--space-8, 32px)", textAlign: "center", color: "var(--color-text-secondary)", fontSize: "var(--text-base, 15px)" }}>
        No attendance records found.
      </div>
    );
  }

  const getBadgeVariant = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "present":
        return "success";
      case "late":
      case "half_day":
        return "warning";
      case "absent":
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
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Date</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Check In</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Check Out</th>
            <th style={{ padding: "12px", fontSize: "var(--text-xs, 12px)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-text-primary)" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
              <td className="font-mono" style={{ padding: "12px", fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-primary)" }}>{rec.id}</td>
              <td style={{ padding: "12px", fontWeight: 600, fontSize: "var(--text-base, 15px)", color: "var(--color-text-primary)" }}>{rec.employeeName}</td>
              <td style={{ padding: "12px", fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>{rec.date}</td>
              <td className="font-mono" style={{ padding: "12px", fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-primary)" }}>{rec.checkIn}</td>
              <td className="font-mono" style={{ padding: "12px", fontSize: "var(--font-size-tech, 12px)", color: "var(--color-text-primary)" }}>{rec.checkOut ?? "—"}</td>
              <td style={{ padding: "12px" }}>
                <Badge variant={getBadgeVariant(rec.status)}>
                  {rec.status.replace("_", " ")}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

