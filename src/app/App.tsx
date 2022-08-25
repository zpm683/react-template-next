import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { Router } from "./routers/Router";

export const App = () => (
  <CssBaseline>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </CssBaseline>
);
