import { createContext, useState } from "react";
import Spinner from "../components/Spinner";
import useMeliApiCall from "../hooks/meliApiHook";

const AuthContext = createContext({
  jwt: "",
  fullName: "",
  roles: [],
  handleLogin: async (email, password) => {},
  handleRegister: async (fullName, email, password) => {},
  handleLogout: () => {},
});

const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") || "");
  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") || ""
  );
  const [roles, setRoles] = useState(localStorage.getItem("roles" || []));
  const { login, register, isLoading } = useMeliApiCall();

  const handleLogin = async (email, password) => {
    const response = await login(email, password);
    setJwt(response.token);
    setFullName(response.fullName);
    setRoles(response.roles);
    localStorage.setItem("jwt", response.token);
    localStorage.setItem("fullName", response.fullName);
    localStorage.setItem("roles", response.roles);
  };

  const handleRegister = async (fullName, email, password) => {
    const response = await register(fullName, email, password);
    console.log(response);
    setJwt(response.token);
    setFullName(response.fullName);
    setRoles(response.roles);
    localStorage.setItem("jwt", response.token);
    localStorage.setItem("fullName", response.fullName);
    localStorage.setItem("roles", response.roles);
  };

  const handleLogout = () => {
    setJwt("");
    setFullName("");
    setRoles([]);
    localStorage.removeItem("jwt");
    localStorage.removeItem("fullName");
    localStorage.removeItem("roles");
  };

  return (
    <AuthContext.Provider
      value={{
        jwt,
        fullName,
        roles,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {isLoading && <Spinner />}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
