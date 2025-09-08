import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "@/components/theme-provider";
import App from "./App.tsx";
import "./index.css";

const PUBLISHABLE_KEY = "pk_test_Z2xvcmlvdXMtbWlkZ2UtNjEuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider defaultTheme="dark" storageKey="edutrack-ui-theme">
        <App />
      </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
