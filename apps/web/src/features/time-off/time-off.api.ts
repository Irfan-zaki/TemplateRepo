import { apiClient } from "../../lib/api-client";
import { ApiResponse, TimeOffRequest } from "../../types/api";

export async function getTimeOffRequests(): Promise<ApiResponse<TimeOffRequest[]>> {
  return apiClient.get<ApiResponse<TimeOffRequest[]>>("/time-off/requests");
}

