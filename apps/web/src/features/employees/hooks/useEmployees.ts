import { useEffect, useState, useCallback } from "react";
import { Employee } from "../../../types/api";
import { getEmployees } from "../employee.api";

export function useEmployees() {
  const [data, setData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getEmployees();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch employees"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return { data, isLoading, error, refetch: fetchEmployees };
}

