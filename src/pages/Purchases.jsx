import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import useMeliApiCall from "../hooks/meliApiHook";
import ProductTable from "../components/ProductTable";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const { getPurchases } = useMeliApiCall();

  useEffect(() => {
    getPurchases().then((r) => {
      setPurchases(r);
    });
  }, []);

  return (
    <>
      <NavBar />
      <ProductTable products={purchases} />
      <ToastContainer
        autoClose={5000}
        position="bottom-center"
        theme="colored"
      />
    </>
  );
};

export default Purchases;
