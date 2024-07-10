import { Button, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "../styles/ProductTable.css";
import { useEffect, useState } from "react";
import useMeliApiCall from "../hooks/meliApiHook";
import { toast } from "react-toastify";

const ProductBookmarkedTable = ({ products }) => {
  const [productsToShow, setProductsToShow] = useState([]);

  const { deleteBookmark } = useMeliApiCall();

  useEffect(() => {
    if (Array.isArray(products)) {
      setProductsToShow(products);
    } else {
      setProductsToShow([]);
    }
  }, [products]);

  const handleDelete = (bookmarkId, name) => {
    toast.promise(deleteBookmark(bookmarkId), {
      pending: "Deleting",
      success: {
        render() {
          setProductsToShow((prevProducts) =>
            prevProducts.filter((product) => product.id !== bookmarkId)
          );
          return `Bookmark of product ${name} removed!`;
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
    <div className="product-table-container">
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Comment</th>
              <th>Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productsToShow.map((pts) => {
              return (
                <tr key={pts.id}>
                  <td>{pts.name}</td>
                  <td>${pts.price}</td>
                  <td>{pts.comment}</td>
                  <td>{pts.score}</td>
                  <td>
                    <Button
                      onClick={() => handleDelete(pts.id, pts.name)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ProductBookmarkedTable;
