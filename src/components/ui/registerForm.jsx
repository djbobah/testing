import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import API from "../../api";
import { validator } from "../../utils/validator";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    fio: "",
    departmemt: "",
  });
  const [departmemts, setDepartments] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.departmemt.fetchAll().then((data) => setDepartments(data));
  }, []);

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Электронная почта введена некорректно" },
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру",
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
      },
    },
    fio: {
      isRequired: { message: "Поле 'ФИО' обязательно для заполнения" },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта:"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />{" "}
      <TextField
        label="Пароль:"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <TextField
        label="ФИО:"
        name="fio"
        value={data.fio}
        onChange={handleChange}
        error={errors.fio}
      />
      <div className="mb-4">
        <label htmlFor="validationCustom04" className="form-label">
          State
        </label>
        <select className="form-select" id="validationCustom04" required>
          <option selected disabled value="">
            Выберите подразделение...
          </option>
          {departmemts.map((departmemt) => (
            <option
              selected={departmemt.id === data.departmemt}
              value={departmemt.id}
            >
              {departmemt.name}
            </option>
          ))}
          <option>...</option>
        </select>
        <div className="invalid-feedback">Please select a valid state.</div>
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
