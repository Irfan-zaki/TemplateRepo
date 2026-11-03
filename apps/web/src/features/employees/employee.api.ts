import { apiClient } from "../../lib/api-client";
import { ApiResponse, Employee } from "../../types/api";

export async function getEmployees(): Promise<ApiResponse<Employee[]>> {
  return apiClient.get<ApiResponse<Employee[]>>("/employees");
}

