import { useState, useEffect } from "react";
import AllProductPurchasedTable from "../components/AllProductPurchasedTable";
import useMeliApiCall from "../hooks/meliApiHook";
import NavBar from "../components/NavBar";

const AllPurchases = () => {
  const [bookmarks, setBoomarks] = useState([]);
  const { getAllPurchases } = useMeliApiCall();

  useEffect(() => {
    getAllPurchases().then((r) => {
      setBoomarks(r);
    });
  }, []);

  return (
    <>
      <NavBar />
      <AllProductPurchasedTable products={bookmarks} />
    </>
  );
};

export default AllPurchases;
