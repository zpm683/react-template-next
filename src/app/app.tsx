import { FC } from "react";
import { RouterProvider } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { Error } from "./error";
import { router } from "./routers";
import { theme } from "./themes";

const App: FC = () => {
  return (
    <Error>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </CssBaseline>
    </Error>
  );
};

export { App };
