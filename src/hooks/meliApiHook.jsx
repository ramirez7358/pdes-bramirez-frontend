import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { getErrorMessage } from "../util/get-error";

const useMeliApiCall = () => {
  const API_URL = import.meta.env.VITE_REACT_APP_BACKEND;

  const [isLoading, setIsLoading] = useState(false);
  const { jwt } = useContext(AuthContext);

  const resetJwt = () => {
    localStorage.removeItem("jwt");
  };

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: username,
        password,
      });
      setIsLoading(false);
      return response.data.token;
    } catch (error) {
      const message = getErrorMessage(error);
      console.log(error);
      console.log(message);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const register = async (username, email, password, image, background) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
        image,
        backgroundImage: background,
      });
      setIsLoading(false);
      return response.headers.authorization;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  return {
    login,
    register,
    isLoading,
    resetJwt,
  };
};

export default useMeliApiCall;
