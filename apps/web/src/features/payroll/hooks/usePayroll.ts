import { useEffect, useState, useCallback } from "react";
import { SalaryRule, Payrun } from "../../../types/api";
import { getSalaryRules, getPayruns } from "../payroll.api";

export function usePayroll() {
  const [rules, setRules] = useState<SalaryRule[]>([]);
  const [payruns, setPayruns] = useState<Payrun[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPayrollData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [rulesRes, payrunsRes] = await Promise.all([
        getSalaryRules(),
        getPayruns()
      ]);
      setRules(rulesRes.data);
      setPayruns(payrunsRes.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch payroll data"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayrollData();
  }, [fetchPayrollData]);

  return { rules, payruns, isLoading, error, refetch: fetchPayrollData };
}

