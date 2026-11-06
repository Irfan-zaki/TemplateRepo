import { apiClient } from "../../lib/api-client";
import { ApiResponse } from "../../types/api";
import { RecordItem } from "./types";

export async function getRecords(): Promise<ApiResponse<RecordItem[]>> {
  return apiClient.get<ApiResponse<RecordItem[]>>("/records");
}

