import { Col, Container, Row } from "react-bootstrap";
import "../styles/SearchProductResult.css";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import useMeliApiCall from "../hooks/meliApiHook";
import { toast } from "react-toastify";

const SearchProductResult = ({ products }) => {
  const { isLoading, buyProduct } = useMeliApiCall();
  const [productsToShow, setProductsToShow] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      console.log(products);
      setProductsToShow(products);
    } else {
      setProductsToShow([]);
    }
  }, [products]);

  const handleBuy = (productId, price, count) => {
    toast.promise(buyProduct(productId, price, count), {
      pending: "Connecting",
      success: {
        render() {
          return "Successful purchase";
        },
      },
      error: {
        render({ data }) {
          return data.message;
        },
      },
    });
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="product-result-container">
        <Container>
          <Row className="product-card-container">
            {productsToShow.map((pts) => {
              return (
                <Col key={pts.id} md={3} className="product-card">
                  <img src={pts.pictures[0].url} alt={pts.title} />
                  <p>{pts.title}</p>
                  <p>${pts.price}</p>
                  <div className="product-card-buttons">
                    <button
                      onClick={() => {
                        handleBuy(pts.id, pts.price, 1);
                      }}
                    >
                      Buy
                    </button>
                    <button>Bookmark</button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SearchProductResult;
