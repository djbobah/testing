import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import api from "../../api";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import axios from "axios";
import config from "../../config.json";
// import RadioField from "../common/form/radioField";
// import MultiSelectField from "../common/form/multiSelectField";
// import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = ({ departments }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    fio: "",
    department: "",
    // sex: "male",
    // qualities: [],
    // license: false,
  });
  // const [qualities, setQualities] = useState({});
  // const [departments, setDepartments] = useState();
  const [errors, setErrors] = useState({});
  // console.log("departments", departments);
  const departmentOptions = departments.map((dep) => ({
    name: dep.name,
    value: dep.id,
  }));
  // console.log("departmentOptions", departmentOptions);
  // useEffect(() => {
  //   api.department.fetchAll().then((data) => setDepartments(data));
  //   api.qualities.fetchAll().then((data) => setQualities(data));
  // }, []);

  // useEffect(() => {
  //   console.log("departments", departments);
  // }, [departments]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта обязательна для заполнения" },
      isEmail: { message: "Электронная почта введена некорректно" },
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      // isCapitalSymbol: {
      //   message: "Пароль должен содержать хотя бы одну заглавную букву",
      // },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру",
      },
      min: {
        message: "Пароль должен состоять минимум из 6 символов",
        value: 6,
      },
    },
    fio: {
      isRequired: { message: "Поле 'ФИО' обязательно для заполнения" },
    },
    department: {
      isRequired: { message: "Подразделение обязательно для заполнения" },
    },
    // license: {
    //   isRequired: {
    //     message:
    //       "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения",
    //   },
    // },
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
    const newData = {
      ...data,
      id_department: departmentOptions.filter(
        (dep) => dep.name === data.department
      )[0].value,
      roles: [1],
    };
    try {
      axios.post(config.apiEndpoint + "/auth/signUp", newData);
      // console.log("departments", departments);
    } catch (error) {
      console.log(error);
    }
    console.log(newData);
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
      <TextField
        label="ФИО:"
        name="fio"
        value={data.fio}
        onChange={handleChange}
        error={errors.fio}
      />
      <SelectField
        onChange={handleChange}
        options={departmentOptions}
        name="department"
        defaultOption="Выберите подразделение..."
        error={errors.department}
        value={data.department}
        label="Выберите ваше подразделение..."
      />
      {/* <RadioField
        options={[
          { name: "Мужской", value: "male" },
          { name: "Женский", value: "female" },
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол:"
      /> */}
      {/* <MultiSelectField
        options={qualities}
        onChange={handleChange}
        defaultValue={data.qualities}
        name="qualities"
        label="Выберите ваши качаства"
      />
      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField> */}
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
