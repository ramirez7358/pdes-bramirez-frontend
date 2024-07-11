import { Col, Container, Row, Table } from "react-bootstrap";
import NavBar from "../components/NavBar";
import "../styles/Reports.css";
import { useEffect, useState } from "react";
import useMeliApiCall from "../hooks/meliApiHook";

const Reports = () => {
  const [users, setUsers] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const { getReports } = useMeliApiCall();

  useEffect(() => {
    getReports().then((r) => {
      setUsers(r.topUsers);
      setBookmarks(r.topBookmarks);
      setPurchases(r.topProducts);
    });
  }, []);

  return (
    <>
      <NavBar />
      <div className="report-container">
        <Container>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h3>Top Buying Users</h3>
              <Table
                striped
                bordered
                hover
                style={{
                  textAlign: "center",
                }}
              >
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Purchases</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    return (
                      <tr key={u.id}>
                        <td>{u.fullName}</td>
                        <td>{u.totalpurchases}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <h3>Best-selling products</h3>
              <Table
                striped
                bordered
                hover
                style={{
                  textAlign: "center",
                }}
              >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Purchases</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((p) => {
                    return (
                      <tr key={p.name}>
                        <td>{p.name}</td>
                        <td>{p.totalsold}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            <Col style={{ textAlign: "center" }}>
              <h3>Most Favourite Products</h3>
              <Table
                striped
                bordered
                hover
                style={{
                  textAlign: "center",
                }}
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Total bookmarks</th>
                  </tr>
                </thead>
                <tbody>
                  {bookmarks.map((b) => {
                    return (
                      <tr key={b.name}>
                        <td>{b.name}</td>
                        <td>{b.totalbookmarks}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Reports;
