import React, { useState, useEffect } from "react";

import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import { useAuth } from "../hooks/useAuth";
import { validator } from "../../utils/validator";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getDepartmments } from "../../store/departments";
import { getCurrentUser } from "../../store/users";

const UserProfileDetails = () => {
  const { updateUser } = useAuth();
  const currentUser = useSelector(getCurrentUser());
  const departments = useSelector(getDepartmments());
  const [disabledTextField, setDisabledTextField] = useState(true);
  // console.log("currentDepartment", currentDepartment);
  const [data, setData] = useState({
    email: currentUser.email,
    password: "",
    fio: currentUser.fio,
    // department: currentDepartment.name,
    department: currentUser.id_department,
  });
  const [errors, setErrors] = useState({});

  const departmentOptions = departments.map((dep) => ({
    name: dep.name,
    value: dep.id,
  }));

  // console.log(data.department, departmentOptions);

  // console.log(currentUser);
  const navigate = useNavigate();
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

  const validatorConfig = !disabledTextField
    ? {
        email: {
          isRequired: {
            message: "Электронная почта обязательна для заполнения",
          },
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
      }
    : {
        email: {
          isRequired: {
            message: "Электронная почта обязательна для заполнения",
          },
          isEmail: { message: "Электронная почта введена некорректно" },
        },

        fio: {
          isRequired: { message: "Поле 'ФИО' обязательно для заполнения" },
        },
      };

  const handleClickCancel = () => {
    navigate("/main/home");
  };
  const handleChangePasswordClick = () => {
    setDisabledTextField(!disabledTextField);
    setData((prevState) => ({ ...prevState, password: "" }));
  };
  useEffect(() => {
    validate();
  }, [data, disabledTextField]);

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
    console.log("user profile", data);
    const newData = {
      ...data,
      // id_department: departmentOptions.filter(
      //   (dep) => dep.name === data.department
      // )[0].value,
      // roles: "user",
    };

    try {
      await updateUser(newData);
      //   navigate("/main/home");
      //   // console.log(userService.get());
    } catch (error) {
      setErrors(error);
    } finally {
      toast("Профиль обновлен");
      navigate("/main/home");
    }
  };
  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Электронная почта:"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
              autoFocus
              disabled={false}
            />{" "}
            <div className="d-flex justify-content-between gap-3">
              <TextField
                label="Пароль:"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
                disabled={disabledTextField}
              />
              <button
                type="button"
                className="btn btn-light border mt-4 h-50"
                onClick={handleChangePasswordClick}
              >
                Сменить пароль
              </button>
            </div>
            <TextField
              label="ФИО:"
              name="fio"
              value={data.fio}
              onChange={handleChange}
              error={errors.fio}
              disabled={false}
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
            <div className="d-flex justify-content-between gap-3">
              {/* <div className="position-absolute  bottom-0 end-0"> */}
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 "
              >
                Обновить данные профиля
              </button>
              <button
                onClick={handleClickCancel}
                type="button"
                // disabled={!isValid}
                className="btn btn-secondary w-100 "
              >
                Отмена
              </button>
            </div>
            {/* </div> */}
          </form>
        </div>
      </div>
      {/* {sortedComments.length > 0 && ( */}
      {/* <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          ff */}
      {/* <CommentsList
            comments={sortedComments}
            onRemove={handleRemoveComment}
          /> */}
      {/* </div> */}
      {/* </div> */}
      {/* )} */}
    </>
  );
};

export default UserProfileDetails;
