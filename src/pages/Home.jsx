import "../styles/Home.css";
import NavBar from "../components/NavBar";
import ProductFilter from "../components/ProductFilter";
import SearchProductResult from "../components/SearchProductResult";
import { useState, useEffect } from "react";
import useMeliApiCall from "../hooks/meliApiHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";

const Home = () => {
  const [products, setProducts] = useState([]);

  const { getProducts, isLoading } = useMeliApiCall();

  return (
    <>
      <NavBar />
      <ProductFilter
        onFilter={(filters) => {
          getProducts(filters.category).then((r) => setProducts(r));
        }}
      />
      <SearchProductResult products={products} />
      <ToastContainer
        autoClose={5000}
        position="bottom-center"
        theme="colored"
      />
      {isLoading && <Spinner />}
    </>
  );
};

export default Home;
