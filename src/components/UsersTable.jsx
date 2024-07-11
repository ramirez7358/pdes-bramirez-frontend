import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import "../styles/UsersTable.css";
import { useEffect, useState } from "react";
import useMeliApiCall from "../hooks/meliApiHook";

const UsersTable = () => {
  const { getAllUsers } = useMeliApiCall();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((allUsers) => {
      setUsers(allUsers);
    });
  }, []);

  return (
    <div className="users-table-container">
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Fullname</th>
            </tr>
          </thead>
          <tbody>
            {users.map((pts) => {
              return (
                <tr key={pts.id}>
                  <td>{pts.id}</td>
                  <td>{pts.email}</td>
                  <td>{pts.fullName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default UsersTable;
