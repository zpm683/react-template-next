import { CssBaseline, ThemeProvider } from "@mui/material";

import { AppBuilder } from "shared/utils";

import { APP_PATH } from "./constants";
import { Home } from "./pages";
import { theme } from "./themes";

type AppContext = {
  isOk: boolean;
  xXX: string;
};

const AppInstance = AppBuilder<AppContext>()
  .provider(CssBaseline)
  .provider(ThemeProvider, { theme })
  .context("isOk", false)
  .context("xXX", "")
  .page({
    path: APP_PATH.ROOT,
    element: <Home />,
  })
  .page({ path: APP_PATH.HOME, element: <Home /> })
  .auth(() => false, APP_PATH.ROOT)
  .error(({ error }) => (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error?.message}</pre>
    </div>
  ))
  .notFound(<div>404</div>)
  .build();

export { AppInstance };
