import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
// import SelectField from "../common/form/selectField";
import { useAuth } from "./../hooks/useAuth";
import TextAreaField from "../common/form/textAreaField";
import CheckBoxField from "../common/form/checkBoxField";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createTest,
  getCurrentTest,
  getIsEditTest,
  setCurrentTest,
} from "../../store/tests";
import { Link } from "react-router-dom";

const CreateTest = ({ data, onChange }) => {
  const dispatch = useDispatch();
  // const currentTest = useSelector(getCurrentTest());

  const edit = useSelector(getIsEditTest());
  // const currentTest = useSelector(getCurrentTest());

  // console.log("create test currentTest", currentTest);
  // console.log("create test edit", edit);

  // const [data, setData] = useState(
  //   currentTest || {
  //     testName: "",
  //     description: "",
  //     timeOfTest: 30,
  //     numberOfQuestionsForTest: 0,
  //     isRandomQuestions: false,
  //   }
  // );
  const [errors, setErrors] = useState({});
  const { currentUser } = useAuth();

  // const handleChange = (target) => {
  //   setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  // };
  const validatorConfig = {
    testName: {
      isRequired: { message: "Наименование теста обязательно для заполнения" },
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
    console.log("currentUser", currentUser);
    if (currentUser) {
      const newData = {
        ...data,
        authorId: currentUser.id,
        isPublished: false,
      };
      // console.log(newData);
      dispatch(createTest(newData));
      // const curTest = useSelector(getCurrentTest());
      // console.log("data2", data2);
      // console.log("currentTest", currentTest);
      // try {
      //   // navigate("/main/home");

      //   console.log("try create question");
      //   await createQuestion({
      //     idTest: data.newTest.id,
      //     question: "DataTypes.STRING",
      //     typeOfAnswers: 1,
      //     cost: 0,
      //   });
      // } catch (error) {
      //   setErrors(error);
      // }

      // setEdit(true);
      toast("Тест создан");
    }
  };

  // console.log("currentTest", currentTest);
  // console.log("edit", edit);
  return (
    <div className="container " style={{ marginTop: "1px" }}>
      {/* <div className="row gutters-sm"> */}
      {/* <div className="col-md-12"> */}
      {/* <div className="card mb-3"> */}
      <div className="card-body ">
        {!edit && (
          <>
            <h2>Создание теста</h2>
            <hr />
          </>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Наименование теста:"
            name="testName"
            value={data.testName}
            onChange={onChange}
            error={errors.testName}
            autoFocus
          />{" "}
          <TextAreaField
            label="Описание:"
            name="description"
            value={data.description}
            onChange={onChange}
            error={errors.description}
          />
          {/* <div className="d-flex ">
                  <div className="w-50 mx-auto me-4"> */}
          <TextField
            label="Время на прохождение теста (мин):"
            name="timeOfTest"
            type="number"
            value={data.timeOfTest}
            onChange={onChange}
            error={errors.timeOfTest}
          />
          {/* </div> */}
          {/* <div className="w-50 mx-auto">
                    <TextField
                      label="Укажите число вопросов для тестирования:"
                      name="numberOfQuestionsForTest"
                      type="number"
                      value={data.numderOfQuestionsForTest}
                      onChange={handleChange}
                      error={errors.numderOfQuestionsForTest}
                    />
                  </div> */}
          {/* </div> */}
          <CheckBoxField
            value={data.isRandomQuestions}
            onChange={onChange}
            name="isRandomQuestions"
            error={errors.isRandomQuestions}
          >
            Вопросы для теста брать из базы случайным образом
          </CheckBoxField>
          {!edit && (
            <div className="d-flex">
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-50 mx-auto me-4"
              >
                Создать
              </button>
              <Link to="/main/home" className="btn btn-secondary w-50 mx-auto">
                Отмена
              </Link>
            </div>
          )}
        </form>
      </div>
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default CreateTest;
