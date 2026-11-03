import React from "react";
import { useAttendance } from "../hooks/useAttendance";
import { AttendanceTable } from "../components/AttendanceTable";

export const AttendancePage: React.FC = () => {
  const { data, isLoading, error, refetch } = useAttendance();

  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h2 style={{ margin: "0 0 0.5rem 0" }}>Daily Attendance</h2>
          <p style={{ margin: 0, color: "#64748b" }}>
            Track daily attendance records and check-in / check-out times.
          </p>
        </div>
        <button
          onClick={refetch}
          style={{
            padding: "8px 16px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Refresh Data
        </button>
      </div>

      {isLoading && (
        <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
          Loading attendance records from API...
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #fecaca",
            borderRadius: "6px"
          }}
        >
          <strong>API Error:</strong> {error.message}
        </div>
      )}

      {!isLoading && !error && <AttendanceTable records={data} />}
    </div>
  );
};

