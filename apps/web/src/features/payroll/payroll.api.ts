import { apiClient } from "../../lib/api-client";
import { ApiResponse, SalaryRule, Payrun } from "../../types/api";

export async function getSalaryRules(): Promise<ApiResponse<SalaryRule[]>> {
  return apiClient.get<ApiResponse<SalaryRule[]>>("/salary-rules");
}

export async function getPayruns(): Promise<ApiResponse<Payrun[]>> {
  return apiClient.get<ApiResponse<Payrun[]>>("/payruns");
}

