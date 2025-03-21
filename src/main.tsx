import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React from "react";
import { AppProvider } from "@contexts/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  // </React.StrictMode>
);
