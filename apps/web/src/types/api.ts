export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  createdAt: string;
}
