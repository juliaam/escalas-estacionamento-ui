import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProviderHook } from "@/pages/RouteConfig";

import "@/styles/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProviderHook />
  </StrictMode>
);
