import React, { useState, useEffect, useContext } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import httpService from "../../services/http.service";
import { setTokens } from "../../services/localStorage.service";
import { useNavigate } from "react-router-dom";
// import { useQContext } from "../../App";
// import { QContext } from "../../App";
// import CheckBoxField from "../common/form/checkBoxField";

const LoginForm = () => {
  // , stayOn: false
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [enterError, setEnterError] = useState(null);

  // const qqq = useQContext();
  // console.log("data from app", qqq);

  const navigate = useNavigate();
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
      await httpService
        .post("/auth/signInWithPassword", data)
        .then((req, res) => {
          console.log("signInWithPassword", req.data);
          setTokens(req.data);
        });
      navigate("/main");
    } catch (error) {
      const { code, message } = error.response.data.error;
      // console.log(code, message);
      if (code === 400) {
        // if (message === "EMAIL_NOT_FOUND") {
        //   setErrors({ email: "Пользователь с таким email не найден" });
        // }
        // if (message === "INVALID_PASSWORD") {
        //   setErrors({ email: "Пароль введен некорректно" });
        // }

        setEnterError("Email или пароль введены некорректно");
      }
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
