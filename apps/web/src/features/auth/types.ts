export interface SignupInput {
  fullName: string;
  email: string;
  companyName: string;
  role: string;
  password: string;
  confirmPassword?: string;
  agreeToTerms: boolean;
}

export interface SignupResponse {
  userId: string;
  email: string;
  fullName: string;
  companyName: string;
  role: string;
  createdAt: string;
  token?: string;
}

