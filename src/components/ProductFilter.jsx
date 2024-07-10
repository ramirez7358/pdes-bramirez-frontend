import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "../styles/ProductFilter.css";
import useMeliApiCall from "../hooks/meliApiHook";

const ProductFilter = ({ onFilter }) => {
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const { getCategories, isLoading } = useMeliApiCall();

  useEffect(() => {
    getCategories().then((response) => {
      setCategories(response);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ keyword, minPrice, maxPrice, brand, category });
  };

  const isFormValid = () => {
    return (
      keyword.trim() !== "" ||
      minPrice.trim() !== "" ||
      maxPrice.trim() !== "" ||
      brand.trim() !== "" ||
      category.trim() !== ""
    );
  };

  return (
    <div className="product-filter-container">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value={""}>Select the category</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formKeyword">
              <Form.Label>Keyword</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por palabra clave"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formMinPrice">
              <Form.Label>Min. Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio mínimo"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formMaxPrice">
              <Form.Label>Max. Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio máximo"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por marca"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>
          </Row>

          <button
            type="submit"
            className="search-button"
            disabled={!isFormValid()}
          >
            Search
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default ProductFilter;
