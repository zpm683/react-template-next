import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppInstance } from "./app";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AppInstance.Component />
  </StrictMode>,
);
