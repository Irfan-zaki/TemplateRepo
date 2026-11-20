import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Alert } from "../components/ui/Alert";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { SignupPage } from "../features/auth/pages/SignupPage";
import { useAuth } from "./AuthProvider";
import { AppShell } from "./AppShell";
import { featureRoutes, type FeatureRoute } from "./feature-registry";
import { ModeBanner } from "./ModeBanner";

const FeatureGate: React.FC<{ feature: FeatureRoute }> = ({ feature }) => {
  const { user } = useAuth();
  if (!user || !feature.roles.includes(user.role)) {
    return (
      <div style={{ padding: "var(--space-6, 24px)" }}>
        <Alert variant="danger" title="Access denied">
          Your role cannot open this screen.
        </Alert>
      </div>
    );
  }
  const Page = feature.page;
  return <Page />;
};

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div style={{ padding: "var(--space-8, 32px)", color: "var(--text-muted)" }}>Checking session...</div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div style={{ padding: "var(--space-8, 32px)", color: "var(--text-muted)" }}>Checking session...</div>
    );
  }
  if (user) return <Navigate to="/app/records" replace />;
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--page)" }}>
      <ModeBanner />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <PublicOnly>
                <LoginPage />
              </PublicOnly>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicOnly>
                <SignupPage />
              </PublicOnly>
            }
          />
          <Route
            path="/app"
            element={
              <RequireAuth>
                <AppShell />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="records" replace />} />
            {featureRoutes.map((feature) => (
              <Route key={feature.id} path={feature.path} element={<FeatureGate feature={feature} />} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </div>
  );
};
