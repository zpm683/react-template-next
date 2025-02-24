// import { StrictMode } from "react";
// react-scan must be imported before React and React DOM
import { scan } from "react-scan";

import { createRoot } from "react-dom/client";

import { App } from "./app";
import "./index.css";

scan({
  enabled: import.meta.env.DEV,
});

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
