import { Route, Routes } from "react-router-dom";

import { Auth } from "app/layout";

import { APP_PATH } from "../constants";
import { Home, PageNotFound } from "../pages";

const Router = () => {
  return (
    <Routes>
      {/* public routes */}
      {/* <Route path={APP_PATH.LOGIN} element={<Login />} /> */}

      {/* private routes */}
      <Route element={<Auth />}>
        <Route index path={APP_PATH.ROOT} element={<Home />} />
        <Route index path={APP_PATH.HOME} element={<Home />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export { Router };
