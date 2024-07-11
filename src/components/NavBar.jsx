import { useContext } from "react";
import "../styles/NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { handleLogout, fullName, roles } = useContext(AuthContext);
  return (
    <>
      <Navbar expand="lg" className="navbar-container justify-content-between">
        <Container fluid>
          <Navbar.Brand href="#home">APC Mercadolibre</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {roles.includes("buyer") && (
            <Navbar id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/home"}>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={"/bookmarks"}>
                  Bookmarks
                </Nav.Link>
                <Nav.Link as={Link} to={"/purchases"}>
                  Purchases
                </Nav.Link>
              </Nav>
            </Navbar>
          )}
          {roles.includes("admin") && (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/admin-users"}>
                  Users
                </Nav.Link>
                <Nav.Link as={Link} to={"/reports"}>
                  Reports
                </Nav.Link>
                <Nav.Link as={Link} to={"/admin-bookmark"}>
                  Bookmarks report
                </Nav.Link>
                <Nav.Link as={Link} to={"/admin-purchases"}>
                  Purchases report
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          )}
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="fullname">{fullName}</Navbar.Text>
            <Link className="link" onClick={() => handleLogout()}>
              Signout
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
