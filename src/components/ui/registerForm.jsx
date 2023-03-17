import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import api from "../../api";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    fio: "",
    department: "",
  });
  const [departments, setDepartments] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.department.fetchAll().then((data) => setDepartments(data));
  }, []);

  // useEffect(() => {
  //   console.log("departments", departments);
  // }, [departments]);

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
    department: {
      isRequired: { message: "Подразделение обязательно для заполнения" },
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
      <SelectField
        onChange={handleChange}
        options={departments}
        defaultOption="Выберите подразделение..."
        error={errors.department}
        value={data.department}
        label="Выберите ваше подразделение..."
      />
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
