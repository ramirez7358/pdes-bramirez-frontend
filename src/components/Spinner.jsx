import { FaSpinner } from "react-icons/fa";
import "../styles/Spinner.css";

const Spinner = ({ size = "large" }) => {
  return (
    <div className={`spinner-overlay show`}>
      <div className={`spinner ${size}`}>
        <FaSpinner />
      </div>
    </div>
  );
};

export default Spinner;
