export interface AuthUser {
  userId: string;
  email: string;
  fullName: string;
  companyName: string;
  role: string;
  createdAt: string;
}

export interface SignupInput {
  fullName: string;
  email: string;
  companyName: string;
  role: string;
  password: string;
  confirmPassword?: string;
  agreeToTerms: boolean;
}

export interface SignupResponse extends AuthUser {
  token: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
