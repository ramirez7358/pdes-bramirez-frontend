import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { FaEnvelope } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import Input from "./Input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const RegisterForm = () => {
  const [validated, setValidated] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { handleRegister } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      setValidated(true);
      const formData = new FormData(form);
      const body = Object.fromEntries(formData.entries());

      toast.promise(
        handleRegister(
          body.username,
          body.email,
          body.password,
          body.imageurl,
          body.backgroundurl,
          body.fullname
        ),
        {
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
        }
      );
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Input type="text" name="Fullname">
        <FaUserCircle className="icon-placeholder" size={25} />
      </Input>
      <Input type="email" name="Email">
        <FaEnvelope className="icon-placeholder" size={25} />
      </Input>
      <Input type="password" name="Password">
        <FaKey className="icon-placeholder" size={25} />
      </Input>
      <Input type="text" name="Image url">
        <FaImage className="icon-placeholder" size={25} />
      </Input>
      {/*<Input type="text" name="Background url">
        <FaImage className="icon-placeholder" size={25} />
      </Input>*/}
      <button
        disabled={disabled}
        type="submit"
        className={`p-3 mt-4 mb-4 twitter-btn ${
          disabled ? "twitter-btn-disabled" : ""
        }`}
      >
        REGISTER
      </button>
    </Form>
  );
};

export default RegisterForm;
