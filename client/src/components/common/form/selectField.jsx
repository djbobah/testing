import React from "react";
import { getRandomInt } from "../../../utils/math";

const SelectField = ({
  label,
  value,
  name,
  onChange,
  defaultOption,
  options,
  error,
}) => {
  const getInputClasses = () => {
    return "form-select " + (error ? "is-invalid" : "");
  };
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.values(options)
      : options;
  // console.log("getRandomInt", getRandomInt());
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label text-muted">
        {label}
      </label>
      <select
        value={value}
        className={getInputClasses()}
        id={name}
        name={name}
        onChange={handleChange}
        // required
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option
              key={getRandomInt() + option.name}
              // selected={departmemt.id === data.departmemt}
              value={option.value}
            >
              {option.name}
            </option>
          ))}
        {/* <option>jjj</option> */}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;
