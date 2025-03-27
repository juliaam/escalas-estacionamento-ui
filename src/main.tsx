import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProviderHook } from "@/pages/RouteConfig/RouteConfig";

import "@/styles/globals.css";
import { ScaleProvider } from "./shared/hooks/ScaleContext/ScaleProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScaleProvider>
      <RouterProviderHook />
    </ScaleProvider>
  </StrictMode>
);
