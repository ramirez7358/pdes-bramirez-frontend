import { useContext } from "react";
import "../styles/NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { handleLogout } = useContext(AuthContext);
  return (
    <>
      <Navbar expand="lg" className="navbar-container justify-content-between">
        <Container fluid>
          <Navbar.Brand href="#home">APC Mercadolibre</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link className="link" to={"/home"}>
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="link" to={"/bookmarks"}>
                  Bookmarks
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="link" to={"/purchases"}>
                  Purchases
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="fullname">Brian Ramirez</Navbar.Text>
            <Link className="link">Signout</Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
