import React from "react";
import { useNavigate } from "react-router-dom";
import { SignupForm } from "../components/SignupForm";
import { AuthLayout } from "../components/AuthLayout";

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AuthLayout width="wide" headerLink={{ to: "/login", label: "Sign in", prefix: "Have an account?" }}>
      <SignupForm onSuccess={() => navigate("/app/records")} />
    </AuthLayout>
  );
};
