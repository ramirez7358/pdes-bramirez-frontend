import { useRoutes, Navigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Purchases from "../pages/Purchases";
import Bookmarks from "../pages/Bookmarks";
import Reports from "../pages/Reports";
import Users from "../pages/Users";
import AllBookmarks from "../pages/AllBookmarks";
import AllPurchases from "../pages/AllPurchases";

const RequireAuth = ({ children, requiredRole }) => {
  const { jwt, roles } = useContext(AuthContext);
  const location = useLocation();

  if (!jwt || (requiredRole && !roles.includes(requiredRole))) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const Router = () => {
  const { jwt, roles } = useContext(AuthContext);

  const routes = useRoutes([
    {
      path: "/",
      element: jwt ? (
        roles.includes("admin") ? (
          <Navigate to="/reports" />
        ) : (
          <Navigate to="/home" />
        )
      ) : (
        <Login isLoginForm={true} />
      ),
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
          <Bookmarks />
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
      path: "/admin-users",
      element: (
        <RequireAuth requiredRole={"admin"}>
          <Users />
        </RequireAuth>
      ),
    },
    {
      path: "/reports",
      element: (
        <RequireAuth requiredRole={"admin"}>
          <Reports />
        </RequireAuth>
      ),
    },
    {
      path: "/admin-bookmark",
      element: (
        <RequireAuth requiredRole={"admin"}>
          <AllBookmarks />
        </RequireAuth>
      ),
    },
    {
      path: "/admin-purchases",
      element: (
        <RequireAuth requiredRole={"admin"}>
          <AllPurchases />
        </RequireAuth>
      ),
    },
  ]);
  return routes;
};

export default Router;
