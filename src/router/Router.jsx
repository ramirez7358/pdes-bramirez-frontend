import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login isLoginForm={true} />,
    },
    {
      path: "/register",
      element: <Login isLoginForm={false} />,
    },
  ]);
  return routes;
};

export default Router;
