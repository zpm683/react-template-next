import { Outlet } from "react-router-dom";

// TODO: add auth impl

// import { APP_PATH } from "app/constants";

// import { useAuth } from "app/hooks";

const Auth = () => {
  //   const { hasAuth } = useAuth();
  //   return <>{hasAuth() ? <Outlet /> : <Navigate to={APP_PATH.LOGIN} />}</>;
  return <Outlet />;
};

export { Auth };
