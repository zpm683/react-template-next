import { FC } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./routers";

const App: FC = () => <RouterProvider router={router} />;

export { App };
