import React from "react";

const CheckBoxField = ({
  name,
  value,
  onChange,
  children,
  error,
  disabled = false,
}) => {
  const handleChange = (params) => {
    onChange({ name: name, value: !value });
  };
  const getInputClasses = () => {
    return "form-check-input " + (error ? "is-invalid" : "");
  };
  return (
    <div className="form-check mb-4">
      <input
        disabled={disabled}
        className={getInputClasses()}
        type="checkbox"
        value=""
        id={name}
        onChange={handleChange}
        checked={value}
      />
      <label className="form-check-label text-muted" htmlFor={name}>
        {children}
      </label>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default CheckBoxField;
