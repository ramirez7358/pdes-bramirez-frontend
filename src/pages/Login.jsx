import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { SiMercadopago } from "react-icons/si";
import LoginForm from "../components/LoginForm";
import "../styles/Login.css";
import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ isLoginForm }) => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col
            style={{
              backgroundColor: "#FFE600",
              height: "130vh",
              borderRadius: "0 20px 20px 0",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            <SiMercadopago
              style={{ marginTop: "30vh" }}
              color="white"
              size={150}
            />
            <h1 style={{ textTransform: "uppercase" }}>Welcome to APC</h1>
            <span>See what's happening in the world right now</span>
          </Col>
          <Col
            style={{
              marginTop: "20vh",
            }}
          >
            <Card
              style={{
                margin: "0 auto",
                width: "60%",
                padding: "20px",
                border: "none",
              }}
            >
              <Card.Header
                style={{
                  backgroundColor: "white",
                  border: "none",
                  paddingBottom: "0",
                }}
              >
                <Row>
                  <SiMercadopago color="#000" size={29} />
                </Row>
                <Row>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                  >
                    APC Mercadolibre
                  </span>
                </Row>
                <Row>
                  <nav className="authOptions">
                    <ul>
                      <li>
                        <Link className="form" to="/">
                          <span>Login</span>
                        </Link>
                      </li>
                      <li>
                        <Link className="form" to="/register">
                          <span>Sign up</span>
                        </Link>
                      </li>
                      <li
                        className={`animation ${
                          isLoginForm ? "startLogin" : "startRegister"
                        }`}
                      ></li>
                    </ul>
                  </nav>
                </Row>
              </Card.Header>
              <Card.Body>
                {isLoginForm ? (
                  <>
                    <LoginForm />
                    <span>
                      New in APC?{" "}
                      <Link className="sign-up-link" to="/register">
                        Sign up now
                      </Link>
                    </span>
                  </>
                ) : (
                  <RegisterForm />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer
          autoClose={5000}
          position="bottom-center"
          theme="colored"
        />
      </Container>
    </>
  );
};

export default Login;
