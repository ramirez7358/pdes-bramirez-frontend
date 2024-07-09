import { useRoutes, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
  const { jwt } = useContext(AuthContext);
  const location = useLocation();

  if (!jwt) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const Router = () => {
  const { jwt } = useContext(AuthContext);

  const routes = useRoutes([
    {
      path: "/",
      element: jwt ? <Navigate to="/home" /> : <Login isLoginForm={true} />,
    },
    {
      path: "/register",
      element: <Login isLoginForm={false} />,
    },
    {
      path: "/home",
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/bookmarks",
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/purchases",
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
    },
  ]);
  return routes;
};

export default Router;
