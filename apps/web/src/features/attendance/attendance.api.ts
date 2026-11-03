import { apiClient } from "../../lib/api-client";
import { ApiResponse, AttendanceRecord } from "../../types/api";

export async function getAttendance(): Promise<ApiResponse<AttendanceRecord[]>> {
  return apiClient.get<ApiResponse<AttendanceRecord[]>>("/attendance");
}

