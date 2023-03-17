import React from "react";

const SelectField = ({
  label,
  value,
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
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName].id,
        }))
      : options;

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <select
        value={value}
        className={getInputClasses()}
        id="validationCustom04"
        name="department"
        onChange={handleChange}
        // required
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option
              key={option.id}
              // selected={departmemt.id === data.departmemt}
              value={option.id}
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
