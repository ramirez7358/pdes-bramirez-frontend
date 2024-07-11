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

  const getAllBookmarks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/reports/bookmark`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setIsLoading(false);
      return response.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/reports/user`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setIsLoading(false);
      return response.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const createBookmark = async (bookmarkId, score, comment) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/bookmark`,
        {
          productId: bookmarkId,
          comment: comment,
          score: parseInt(score),
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const deleteBookmark = async (bookmarkId) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`${API_URL}/bookmark/${bookmarkId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const getBookmarks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/bookmark`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setIsLoading(false);
      return response.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const getPurchases = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/purchase`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setIsLoading(false);
      return response.data.data;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const bookmarkProduct = async (productId, comment, score) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/bookmark`,
        {
          productId: productId,
          comment: comment,
          score: score,
        },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const buyProduct = async (productId, price, count) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/purchase`,
        {
          productId: productId,
          price: price,
          count: count,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const getProducts = async (categoryId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${API_URL}/product/${categoryId}?limit=12&offset=0`
      );
      setIsLoading(false);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/categories`);
      setIsLoading(false);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: username,
        password,
      });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      const message = getErrorMessage(error);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  const register = async (username, email, password, image, fullName) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/auth/register`, {
        email: email,
        password,
        fullName,
      });
      setIsLoading(false);
      return response.data.token;
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
    getCategories,
    getProducts,
    buyProduct,
    bookmarkProduct,
    getPurchases,
    getBookmarks,
    deleteBookmark,
    createBookmark,
    getAllUsers,
    getAllBookmarks,
  };
};

export default useMeliApiCall;
