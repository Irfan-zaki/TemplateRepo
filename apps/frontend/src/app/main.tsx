import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AuthProvider } from "./AuthProvider";
import "../styles/tokens.css";

async function bootstrap() {
  const apiMode = import.meta.env.VITE_API_MODE ?? "real";

  if (import.meta.env.PROD && apiMode !== "real") {
    throw new Error("Mock mode is not allowed in production");
  }

  if (import.meta.env.DEV && apiMode === "mock") {
    const { worker } = await import("../mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass"
    });
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

bootstrap();
