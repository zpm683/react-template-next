import { FC } from "react";
import { RouterProvider } from "react-router-dom";

import { CssBaseline } from "@mui/material";

import { router } from "./routers";

const App: FC = () => (
  <CssBaseline>
    <RouterProvider router={router} />
  </CssBaseline>
);

export { App };
