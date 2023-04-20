import { createHashRouter, createBrowserRouter } from "react-router-dom";

import { APP_PATH } from "../constants";
import { Home, PageNotFound } from "../pages";

const createRouter =
  import.meta.env.ENV_BUILD_IN_SINGLEFILE === "true"
    ? createHashRouter
    : createBrowserRouter;

// config the router
const router = createRouter([
  { index: true, element: <Home /> },
  { path: APP_PATH.HOME, element: <Home /> },
  { path: "*", element: <PageNotFound /> },
]);

export { router };
