import { useState, useCallback } from "react";
import { signup } from "../auth.api";
import { SignupInput, SignupResponse } from "../types";
import { ApiError } from "../../../lib/api-client";

export function useSignup() {
  const [data, setData] = useState<SignupResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const executeSignup = useCallback(async (payload: SignupInput) => {
    setIsLoading(true);
    setError(null);

    // Client-side validations
    if (!payload.fullName.trim()) {
      setError("Full name is required.");
      setIsLoading(false);
      return false;
    }

    if (!payload.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setError("Please provide a valid work email address.");
      setIsLoading(false);
      return false;
    }

    if (!payload.companyName.trim()) {
      setError("Company or organization name is required.");
      setIsLoading(false);
      return false;
    }

    if (payload.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return false;
    }

    if (payload.password !== payload.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return false;
    }

    if (!payload.agreeToTerms) {
      setError("You must acknowledge the enterprise terms of service.");
      setIsLoading(false);
      return false;
    }

    try {
      const response = await signup(payload);
      setData(response.data);
      setIsSuccess(true);
      return true;
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        // Try extracting specific server message if provided
        const errorData = err.data as { message?: string } | undefined;
        setError(errorData?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred during account creation.");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
    setIsSuccess(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    isSuccess,
    executeSignup,
    reset
  };
}

