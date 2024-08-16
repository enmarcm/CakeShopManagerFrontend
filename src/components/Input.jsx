import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Input = ({ type, placeholder, icon, isPass, iden, value }) => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="input-container">
      {icon && <FontAwesomeIcon icon={icon} className="input-icon" />}
      <input
        type={isPass && showPass ? "text" : type}
        placeholder={placeholder}
        className="inpt"
        id={iden}
        value={value}
      />
      {isPass ? (
        <button
          type="button"
          className="toggle-show-pass"
          onClick={() => setShowPass(!showPass)}
        >
          <FontAwesomeIcon
            icon={showPass ? faEyeSlash : faEye}
            className="icon-fa"
          />
        </button>
      ) : (
        <div className="toggle-show-pass-placeholder"></div>
      )}
    </div>
  );
};

export default Input;
