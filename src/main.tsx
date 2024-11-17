import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProviderHook } from "./pages/RouteConfig/RouteConfig";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProviderHook />
  </StrictMode>
);
