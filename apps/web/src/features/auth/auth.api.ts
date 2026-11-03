import { apiClient } from "../../lib/api-client";
import { ApiResponse } from "../../types/api";
import { SignupInput, SignupResponse } from "./types";

export async function signup(payload: SignupInput): Promise<ApiResponse<SignupResponse>> {
  return apiClient.post<ApiResponse<SignupResponse>>("/auth/signup", payload);
}

