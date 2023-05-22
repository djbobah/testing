import React, { useState } from "react";

const TextAreaField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  autoFocus,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const getInputClasses = () => {
    return "form-control " + (error ? "is-invalid" : "");
  };
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="text-muted">
        {label}
      </label>
      <div className="input-group has-validation">
        <textarea
          // type="textarea"
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
          autoFocus={autoFocus}
        />
        {/* {type === "password" && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )} */}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
// TextAreaField.defaultProps = { type: "text" };

export default TextAreaField;
