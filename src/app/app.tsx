import { CssBaseline, ThemeProvider } from "@mui/material";

import { DialogerProvider } from "shared/components";
import { AppBuilder } from "shared/utils";

import { APP_PATH } from "./constants";
import { Home, PageNotFound } from "./pages";
import { theme } from "./themes";

const App = AppBuilder()
  .provider(CssBaseline)
  .provider(ThemeProvider, { theme })
  .provider(DialogerProvider)
  .page({
    path: APP_PATH.ROOT,
    element: <Home />,
  })
  .page({ path: APP_PATH.HOME, element: <Home /> })
  .notFound(<PageNotFound />)
  .build();

export { App };
