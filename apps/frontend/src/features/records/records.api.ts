import { apiClient } from "../../lib/api-client";
import { ApiResponse } from "../../types/api";
import { RecordInput, RecordItem } from "./types";

export async function getRecords(): Promise<ApiResponse<RecordItem[]>> {
  return apiClient.get<ApiResponse<RecordItem[]>>("/records");
}

export async function getRecord(id: string): Promise<ApiResponse<RecordItem>> {
  return apiClient.get<ApiResponse<RecordItem>>(`/records/${id}`);
}

export async function createRecord(input: RecordInput): Promise<ApiResponse<RecordItem>> {
  return apiClient.post<ApiResponse<RecordItem>>("/records", input);
}

export async function updateRecord(id: string, input: Partial<RecordInput>): Promise<ApiResponse<RecordItem>> {
  return apiClient.patch<ApiResponse<RecordItem>>(`/records/${id}`, input);
}
