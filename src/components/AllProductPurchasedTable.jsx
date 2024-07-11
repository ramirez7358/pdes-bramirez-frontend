import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "../styles/ProductTable.css";
import { useEffect, useState } from "react";

const AllProductPurchasedTable = ({ products }) => {
  const [productsToShow, setProductsToShow] = useState([]);

  useEffect(() => {
    if (Array.isArray(products)) {
      setProductsToShow(products);
    } else {
      setProductsToShow([]);
    }
  }, [products]);

  return (
    <div className="product-table-container">
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Count</th>
              <th>User</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {productsToShow.map((pts) => {
              return (
                <tr key={pts.id}>
                  <td>{pts.name}</td>
                  <td>{pts.price}</td>
                  <td>{pts.count}</td>
                  <td>{pts.user.fullName}</td>
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

export default AllProductPurchasedTable;
