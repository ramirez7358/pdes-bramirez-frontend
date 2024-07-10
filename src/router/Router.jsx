import { useRoutes, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Purchases from "../pages/Purchases";

const RequireAuth = ({ children, requiredRole }) => {
  const { jwt, roles } = useContext(AuthContext);
  const location = useLocation();

  if (!jwt || (requiredRole && !roles.includes(requiredRole))) {
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
        <RequireAuth requiredRole={"buyer"}>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/bookmarks",
      element: (
        <RequireAuth requiredRole={"buyer"}>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/purchases",
      element: (
        <RequireAuth requiredRole={"buyer"}>
          <Purchases />
        </RequireAuth>
      ),
    },
    {
      path: "/users",
      element: (
        <RequireAuth requiredRole={"admin"}>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/reports",
      element: (
        <RequireAuth requiredRole={"admin"}>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/admin-bookmark",
      element: (
        <RequireAuth requiredRole={"admin"}>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/admin-purchases",
      element: (
        <RequireAuth requiredRole={"admin"}>
          <Home />
        </RequireAuth>
      ),
    },
  ]);
  return routes;
};

export default Router;
