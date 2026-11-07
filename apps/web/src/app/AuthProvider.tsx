import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { fetchMe, login as loginRequest } from "../features/auth/auth.api";
import { AuthUser, LoginInput, SignupResponse } from "../features/auth/types";
import { ApiError, getStoredToken, setStoredToken } from "../lib/api-client";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<string | null>;
  establishSession: (session: SignupResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(() => Boolean(getStoredToken()));

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    fetchMe()
      .then((response) => {
        if (!cancelled) setUser(response.data);
      })
      .catch(() => {
        if (!cancelled) {
          setStoredToken(null);
          setUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const establishSession = useCallback((session: SignupResponse) => {
    setStoredToken(session.token);
    setUser({
      userId: session.userId,
      email: session.email,
      fullName: session.fullName,
      companyName: session.companyName,
      role: session.role,
      createdAt: session.createdAt
    });
  }, []);

  const login = useCallback(async (input: LoginInput) => {
    try {
      const response = await loginRequest(input);
      establishSession(response.data);
      return null;
    } catch (error: unknown) {
      if (error instanceof ApiError) return error.message;
      return "Sign in failed.";
    }
  }, [establishSession]);

  const logout = useCallback(() => {
    setStoredToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, login, establishSession, logout }),
    [user, isLoading, login, establishSession, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return value;
}
