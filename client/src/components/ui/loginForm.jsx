import React, { useState, useEffect, useContext } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import httpService from "../../services/http.service";
import { setTokens } from "../../services/localStorage.service";
import { unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// import { useQContext } from "../../App";
// import { QContext } from "../../App";
// import CheckBoxField from "../common/form/checkBoxField";

const LoginForm = () => {
  // , stayOn: false
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);
  const { logIn } = useAuth();
  // const qqq = useQContext();
  // console.log("data from app", qqq);

  const navigate = useNavigate();

  console.log("navigate", navigate);
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    setEnterError(null);
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      // isEmail: { message: "Электронная почта введена некорректно" },
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      // isCapitalSymbol: {
      //   message: "Пароль должен содержать хотя бы одну заглавную букву",
      // },
      // isContainDigit: {
      //   message: "Пароль должен содержать хотя бы одну цифру",
      // },
      // min: {
      //   message: "Пароль должен состоять минимум из 6 символов",
      //   value: 6,
      // },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
    try {
      await logIn(data);

      navigate("/main");
    } catch (error) {
      setEnterError(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта:"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
        autoFocus
      />{" "}
      <TextField
        label="Пароль:"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      {/* <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField> */}
      {enterError && <p className="text-danger">{enterError}</p>}
      <button
        type="submit"
        disabled={!isValid || enterError}
        className="btn btn-primary w-100 mx-auto"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
