import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "../styles/ProductTable.css";
import { useEffect, useState } from "react";

const AllProductBookmarkedTable = ({ products }) => {
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
              <th>Comment</th>
              <th>Score</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {productsToShow.map((pts) => {
              return (
                <tr key={pts.id}>
                  <td>{pts.name}</td>
                  <td>{pts.comment}</td>
                  <td>{pts.score}</td>
                  <td>{pts.user.fullName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AllProductBookmarkedTable;
