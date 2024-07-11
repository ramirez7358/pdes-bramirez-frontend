import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import useMeliApiCall from "../hooks/meliApiHook";
import ProductBookmarkedTable from "../components/ProductBookmarkedTable";

const Bookmarks = () => {
  const [bookmarks, setBoomarks] = useState([]);
  const { getBookmarks } = useMeliApiCall();

  useEffect(() => {
    getBookmarks().then((r) => {
      setBoomarks(r);
    });
  }, []);

  return (
    <>
      <NavBar />
      <ProductBookmarkedTable products={bookmarks} />
      <ToastContainer
        autoClose={5000}
        position="bottom-center"
        theme="colored"
      />
    </>
  );
};

export default Bookmarks;
