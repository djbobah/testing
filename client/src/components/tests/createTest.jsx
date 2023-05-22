import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
// import SelectField from "../common/form/selectField";
import { useAuth } from "./../hooks/useAuth";
import TextAreaField from "../common/form/textAreaField";
import CheckBoxField from "../common/form/checkBoxField";

const CreateTest = () => {
  const [data, setData] = useState({
    testName: "",
    description: "",
    timeOfTest: "",
    numderOfQuestionsForTest: "",
    // sex: "male",
    // qualities: [],
    isRandomQuestions: false,
  });
  // const [qualities, setQualities] = useState({});
  // const [departments, setDepartments] = useState();
  const [errors, setErrors] = useState({});
  // console.log("departments", departments);
  const { currentUser } = useAuth();

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    testName: {
      isRequired: { message: "Наименование теста обязательно для заполнения" },
      // isEmail: { message: "Электронная почта введена некорректно" },
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
    // const isValid = validate();
    // if (!isValid) return;

    const newData = {
      ...data,
      idAuthor: currentUser.id,
    };
    console.log(newData);
    // try {
    //   await signUp(newData);
    //   navigate("/main/home");
    //   // console.log(userService.get());
    // } catch (error) {
    //   setErrors(error);
    // }
  };

  console.log("currentUser", currentUser);
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
                <TextAreaField
                  label="Описание:"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  error={errors.description}
                />
                <div className="d-flex ">
                  <div className="w-50 mx-auto me-4">
                    <TextField
                      label="Время на прохождение теста (мин):"
                      name="timeOfTest"
                      type="number"
                      value={data.timeOfTest}
                      onChange={handleChange}
                      error={errors.timeOfTest}
                    />
                  </div>
                  <div className="w-50 mx-auto">
                    <TextField
                      label="Укажите число вопросов для тестирования:"
                      name="numderOfQuestionsForTest"
                      type="number"
                      value={data.numderOfQuestionsForTest}
                      onChange={handleChange}
                      error={errors.numderOfQuestionsForTest}
                    />
                  </div>
                </div>
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
      /> */}
                <CheckBoxField
                  value={data.isRandomQuestions}
                  onChange={handleChange}
                  name="isRandomQuestions"
                  error={errors.isRandomQuestions}
                >
                  Вопросы для теста брать из базы случайным образом
                </CheckBoxField>
                <div className="d-flex">
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-primary w-50 mx-auto me-4"
                  >
                    Создать
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-secondary w-50 mx-auto"
                  >
                    Отмена
                  </button>
                </div>
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
