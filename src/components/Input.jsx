import { useState } from "react";

const Input = ({ name, type, children }) => {
  const [value, setValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsInvalid(false);
  };

  const handleInvalid = (e) => {
    setIsInvalid(true);
    setErrorMessage(e.target.validationMessage);
  };

  return (
    <>
      {isInvalid && <span className="error-message">- {errorMessage}</span>}
      <div className="input-box">
        {children}
        <input
          name={name.replace(/\s/g, "").toLowerCase()}
          type={type}
          required
          className="customTwitterInput"
          value={value}
          onChange={handleChange}
          onInvalid={handleInvalid}
        />
        <span>{name}</span>
      </div>
    </>
  );
};

export default Input;
