import React from "react";

const TextField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p>{error}</p>}
    </div>
  );
};
TextField.defaultProps = { type: "text" };

export default TextField;
