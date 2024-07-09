import { createContext, useState } from "react";
import Spinner from "../components/Spinner";
import useMeliApiCall from "../hooks/meliApiHook";

const AuthContext = createContext({
  jwt: "",
  fullName: "",
  handleLogin: async (email, password) => {},
  handleRegister: async (username, email, password, image, fullName) => {},
  handleLogout: () => {},
});

const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") || "");
  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") || ""
  );
  const { login, register, isLoading } = useMeliApiCall();

  const handleLogin = async (email, password) => {
    const response = await login(email, password);
    setJwt(response.token);
    setFullName(response.fullName);
    localStorage.setItem("jwt", response.token);
    localStorage.setItem("fullName", response.fullName);
  };

  const handleRegister = async (username, email, password, image, fullName) => {
    const jwt = await register(username, email, password, image, fullName);
    setJwt(jwt);
    localStorage.setItem("jwt", jwt);
  };

  const handleLogout = () => {
    console.log("logout");
    setJwt("");
    setFullName("");
    localStorage.removeItem("jwt");
    localStorage.removeItem("fullName");
  };

  return (
    <AuthContext.Provider
      value={{ jwt, fullName, handleLogin, handleRegister, handleLogout }}
    >
      {isLoading && <Spinner />}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
