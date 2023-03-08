import { RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { Router } from "./routers";

export const App = () => (
  <CssBaseline>
     <RouterProvider router={router} />
  </CssBaseline>
);
