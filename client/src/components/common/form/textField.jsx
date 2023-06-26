import React, { useState } from "react";

const TextField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  autoFocus,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const getInputClasses = () => {
    return "form-control " + (!disabled && error ? "is-invalid" : "");
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const dis = true;
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="text-muted">
          {label}
        </label>
      )}
      {/* <label htmlFor={name} className="text-muted">
        {label}
      </label> */}
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
          autoFocus={autoFocus}
          disabled={disabled}
        />
        {!disabled && type === "password" && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={toggleShowPassword}
            // disabled={disabled}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}

        {!disabled && error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
TextField.defaultProps = { type: "text" };

export default TextField;
