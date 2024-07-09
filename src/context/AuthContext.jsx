import { createContext, useState } from "react";
import Spinner from "../components/Spinner";
import useMeliApiCall from "../hooks/meliApiHook";

const AuthContext = createContext({
  jwt: "",
  fullName,
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
    const { token } = await login(email, password);
    setJwt(jwt);
    localStorage.setItem("jwt", jwt);
  };

  const handleRegister = async (username, email, password, image, fullName) => {
    const jwt = await register(username, email, password, image, fullName);
    setJwt(jwt);
    localStorage.setItem("jwt", jwt);
  };

  const handleLogout = () => {
    setJwt("");
    localStorage.removeItem("jwt");
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
