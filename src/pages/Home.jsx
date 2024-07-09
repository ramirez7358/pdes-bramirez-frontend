import "../styles/Home.css";
import NavBar from "../components/NavBar";
import ProductFilter from "../components/ProductFilter";

const Home = () => {
  return (
    <>
      <NavBar />
      <ProductFilter
        onFilter={(keyword, minPrice, maxPrice, brand, category) => {
          console.log(keyword, minPrice, maxPrice, brand, category);
        }}
      />
    </>
  );
};

export default Home;
