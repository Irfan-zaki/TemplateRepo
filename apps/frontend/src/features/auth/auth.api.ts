import { apiClient } from "../../lib/api-client";
import { ApiResponse } from "../../types/api";
import { AuthUser, LoginInput, SignupInput, SignupResponse } from "./types";

export async function signup(payload: SignupInput): Promise<ApiResponse<SignupResponse>> {
  return apiClient.post<ApiResponse<SignupResponse>>("/auth/signup", payload);
}

export async function login(payload: LoginInput): Promise<ApiResponse<SignupResponse>> {
  return apiClient.post<ApiResponse<SignupResponse>>("/auth/login", payload);
}

export async function fetchMe(): Promise<ApiResponse<AuthUser>> {
  return apiClient.get<ApiResponse<AuthUser>>("/auth/me");
}
