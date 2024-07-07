import { createContext, useState } from "react";
import Spinner from "../components/Spinner";
import useMeliApiCall from "../hooks/meliApiHook";

const AuthContext = createContext({
  jwt: "",
  handleLogin: async (email, password) => {},
  handleRegister: async (username, email, password, image, background) => {},
  handleLogout: () => {},
});

const AuthProvider = ({ children }) => {
  const [jwt, setJwt] = useState(localStorage.getItem("jwt") || "");
  const { login, register, isLoading } = useMeliApiCall();

  const handleLogin = async (email, password) => {
    const jwt = await login(email, password);
    setJwt(jwt);
    localStorage.setItem("jwt", jwt);
  };

  const handleRegister = async (
    username,
    email,
    password,
    image,
    background
  ) => {
    const jwt = await register(
      username,
      email,
      password,
      password,
      image,
      background
    );
    setJwt(jwt);
    localStorage.setItem("jwt", jwt);
  };

  const handleLogout = () => {
    setJwt("");
    localStorage.removeItem("jwt");
  };

  return (
    <AuthContext.Provider
      value={{ jwt, handleLogin, handleRegister, handleLogout }}
    >
      {isLoading && <Spinner />}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
