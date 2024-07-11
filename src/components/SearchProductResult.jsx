import { Col, Container, Row } from "react-bootstrap";
import "../styles/SearchProductResult.css";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import useMeliApiCall from "../hooks/meliApiHook";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SearchProductResult = ({ products }) => {
  const { isLoading, buyProduct, createBookmark } = useMeliApiCall();
  const [productsToShow, setProductsToShow] = useState([]);
  const [show, setShow] = useState(false);

  // to modal
  const [bookmarkId, setBookmarkId] = useState("");
  const [score, setScore] = useState("");
  const [comment, setComment] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (bookmarkId) => {
    setBookmarkId(bookmarkId);
    setShow(true);
  };

  useEffect(() => {
    if (Array.isArray(products)) {
      setProductsToShow(products);
    } else {
      setProductsToShow([]);
    }
  }, [products]);

  const handleScoreChange = (e) => {
    const value = e.target.value;
    if (value === "" || (value >= 1 && value <= 10)) {
      setScore(value);
    }
  };

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

  const handleBookmark = (e) => {
    e.preventDefault();

    toast.promise(createBookmark(bookmarkId, score, comment), {
      pending: "Connecting",
      success: {
        render() {
          handleClose();
          return "Product has been bookmarked";
        },
      },
      error: {
        render({ data }) {
          return data.message;
        },
      },
    });
  };

  const isFormValid = () => {
    return score.trim() !== "" && comment.trim() !== "";
  };

  return (
    <>
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
                    <button onClick={() => handleShow(pts.id)}>Bookmark</button>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to bookmark</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleBookmark}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="number"
                placeholder="Rate the product"
                autoFocus
                min={1}
                max={10}
                value={score}
                onChange={handleScoreChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={handleBookmark}
            disabled={!isFormValid()}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      {isLoading && <Spinner />}
    </>
  );
};

export default SearchProductResult;
