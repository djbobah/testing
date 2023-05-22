import React, { useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import { useAuth } from "./../hooks/useAuth";

const CreateTest = () => {
  const [data, setData] = useState({
    testName: "",
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
  const { currentUser } = useAuth();

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const isValid = validate();
    // if (!isValid) return;
    // console.log(data);
    // const newData = {
    //   ...data,
    //   id_department: departmentOptions.filter(
    //     (dep) => dep.name === data.department
    //   )[0].value,
    //   roles: "user",
    // };
    // try {
    //   await signUp(newData);
    //   navigate("/main/home");
    //   // console.log(userService.get());
    // } catch (error) {
    //   setErrors(error);
    // }
  };
  return (
    <div className="container " style={{ marginTop: "50px" }}>
      <div className="row gutters-sm">
        <div className="col-md-12">
          {/* <div className="card mb-2  ">
            {" "}
            <div className="card-body ">
              <h2></h2>{" "}
            </div>
          </div> */}
          <div className="card mb-3">
            <div className="card-body ">
              <h2>Создание теста</h2>
              <hr />
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Наименование теста:"
                  name="testName"
                  value={data.testName}
                  onChange={handleChange}
                  error={errors.testName}
                  autoFocus
                />{" "}
                {/* <TextField
                  label="Пароль:"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  error={errors.password}
                /> */}
                <TextField
                  label="ФИО:"
                  name="fio"
                  value={data.fio}
                  onChange={handleChange}
                  error={errors.fio}
                />
                {/* <SelectField
                  onChange={handleChange}
                  options={departmentOptions}
                  name="department"
                  defaultOption="Выберите подразделение..."
                  error={errors.department}
                  value={data.department}
                  label="Выберите ваше подразделение..."
                /> */}
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
            </div>
            {/* <div className="position-relative m-2 ">
              <div className="position-absolute  bottom-0 end-0">
                <button className="btn btn-primary me-2">Сохранить</button>
                <button className="btn btn-secondary">Отмена</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTest;
