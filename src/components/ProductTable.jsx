import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "../styles/ProductTable.css";
import { useEffect, useState } from "react";

const ProductTable = ({ products }) => {
  const [productsToShow, setProductsToShow] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setProductsToShow(products);
    } else {
      setProductsToShow([]);
    }
  }, [products]);

  useEffect(() => {
    console.log(productsToShow);
  }, [productsToShow]);

  return (
    <div className="product-table-container">
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Count</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {productsToShow.map((pts) => {
              return (
                <tr key={pts.id}>
                  <td>{pts.id}</td>
                  <td>{pts.name}</td>
                  <td>${pts.price}</td>
                  <td>{pts.count}</td>
                  <td>{pts.created_at}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ProductTable;
