import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";

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
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/bookmarks",
      element: <Home />,
    },
    {
      path: "/purchases",
      element: <Home />,
    },
  ]);
  return routes;
};

export default Router;
