import { FC } from "react";
import { BrowserRouter } from "react-router-dom";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { Error } from "./error";
import { Router } from "./routers";
import { theme } from "./themes";

const App: FC = () => {
  return (
    <Error>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </CssBaseline>
    </Error>
  );
};

export { App };
