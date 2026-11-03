import { useEffect, useState, useCallback } from "react";
import { AttendanceRecord } from "../../../types/api";
import { getAttendance } from "../attendance.api";

export function useAttendance() {
  const [data, setData] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAttendance = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAttendance();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch attendance"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  return { data, isLoading, error, refetch: fetchAttendance };
}

