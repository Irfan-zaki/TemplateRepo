import { useEffect, useState, useCallback } from "react";
import { RecordItem } from "../types";
import { getRecords } from "../records.api";

export function useRecords() {
  const [data, setData] = useState<RecordItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecords = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getRecords();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch records"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return { data, isLoading, error, refetch: fetchRecords };
}

