import { useState, useEffect } from "react";
import AllProductBookmarkedTable from "../components/AllProductBookmarkedTable";
import useMeliApiCall from "../hooks/meliApiHook";
import NavBar from "../components/NavBar";

const AllBookmarks = () => {
  const [bookmarks, setBoomarks] = useState([]);
  const { getAllBookmarks } = useMeliApiCall();

  useEffect(() => {
    getAllBookmarks().then((r) => {
      setBoomarks(r);
    });
  }, []);

  return (
    <>
      <NavBar />
      <AllProductBookmarkedTable products={bookmarks} />
    </>
  );
};

export default AllBookmarks;
