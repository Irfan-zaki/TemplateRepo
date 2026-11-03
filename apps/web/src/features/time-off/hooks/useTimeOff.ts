import { useEffect, useState, useCallback } from "react";
import { TimeOffRequest } from "../../../types/api";
import { getTimeOffRequests } from "../time-off.api";

export function useTimeOff() {
  const [data, setData] = useState<TimeOffRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTimeOff = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getTimeOffRequests();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch time-off requests"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTimeOff();
  }, [fetchTimeOff]);

  return { data, isLoading, error, refetch: fetchTimeOff };
}

