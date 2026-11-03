import React from "react";
import { useAttendance } from "../hooks/useAttendance";
import { AttendanceTable } from "../components/AttendanceTable";
import { Button } from "../../../components/ui/Button";
import { Alert } from "../../../components/ui/Alert";

export const AttendancePage: React.FC = () => {
  const { data, isLoading, error, refetch } = useAttendance();

  return (
    <div style={{ padding: "var(--space-6, 24px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6, 24px)" }}>
        <div>
          <h2 style={{ margin: "0 0 var(--space-2, 8px) 0", fontSize: "var(--text-xl, 22px)", fontWeight: 600, color: "var(--color-text-primary)" }}>
            Daily Attendance
          </h2>
          <p style={{ margin: 0, fontSize: "var(--text-sm, 13px)", color: "var(--color-text-secondary)" }}>
            Track daily attendance records and check-in / check-out times.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={refetch}
        >
          Refresh Data
        </Button>
      </div>

      {isLoading && (
        <div style={{ padding: "var(--space-8, 32px)", textAlign: "center", fontSize: "var(--text-base, 15px)", color: "var(--color-text-secondary)" }}>
          Loading attendance records from API...
        </div>
      )}

      {error && (
        <Alert variant="danger" title="API Error">
          {error.message}
        </Alert>
      )}

      {!isLoading && !error && <AttendanceTable records={data} />}
    </div>
  );
};

