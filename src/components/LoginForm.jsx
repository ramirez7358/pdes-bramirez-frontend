import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import "../styles/LoginForm.css";
import Input from "./Input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const [validated, setValidated] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
    setValidated(true);

    const body = Object.fromEntries(new FormData(form).entries());

    toast.promise(handleLogin(body.username, body.password), {
      pending: "Connecting",
      success: {
        render() {
          const from = location.state?.from?.pathname || "/home";
          navigate(from, { replace: true });
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
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Input type="text" name="Username">
        <FaUserCircle className="icon-placeholder" size={25} />
      </Input>
      <Input type="password" name="Password">
        <FaKey className="icon-placeholder" size={25} />
      </Input>
      <button
        disabled={disabled}
        type="submit"
        className={`p-3 mt-4 mb-4 twitter-btn ${
          disabled ? "twitter-btn-disabled" : ""
        }`}
      >
        SIGN IN
      </button>
    </Form>
  );
};

export default LoginForm;
