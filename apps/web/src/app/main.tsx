import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
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

    console.warn("⚠️ DEVELOPMENT MOCK MODE ENABLED");
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

bootstrap();

