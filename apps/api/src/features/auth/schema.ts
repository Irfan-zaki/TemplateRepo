import { z } from "zod";
import { USER_ROLES } from "../../db/schema/users.js";

export const signupSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  companyName: z.string().trim().min(1, "Company or organization name is required."),
  role: z.enum(USER_ROLES),
  password: z.string().min(8, "Password must be at least 8 characters long."),
  agreeToTerms: z.boolean().refine((value) => value, "You must accept the terms.")
});

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required.")
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
