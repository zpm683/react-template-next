import { Route, Routes } from "react-router-dom";
import { APP_PATH } from "../constants";
import { Home, PageNotFound } from "../pages";

export const Router = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path={APP_PATH.HOME} element={<Home />} />
    <Route path="/*" element={<PageNotFound />} />
  </Routes>
);
