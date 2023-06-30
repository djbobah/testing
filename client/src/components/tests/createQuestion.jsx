import React, { useEffect, useState } from "react";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import SelectField from "../common/form/selectField";
const CreateQuestion = () => {
  // const answers = ;
  const [answers, setAnswers] = useState([
    { id: 1, answer: "lorem10", isTrue: true },
    { id: 2, answer: "lorem20", isTrue: false },
  ]);
  const handleClickAddAnswer = (e) => {
    e.preventDefault();
    // const addAnswer = { id: 3, answer: "lorem30", isTrue: false };
    setAnswers([...answers, { answer: "", isTrue: false }]);
    // answers.push();
    console.log(answers);
  };
  const handleClickSaveAnswer = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    console.log("useEff", answers);
    renderAnswers(answers);
  }, [answers]);
  const renderAnswers = (answers) => {
    console.log("ans", answers);
    return answers?.map((answer) => (
      <div className="d-flex fs-4 " key={answer.id}>
        <CheckBoxField
          value={answer.isTrue}
          //{data.isRandomQuestions}
          // onChange={handleChange}
          name="isRandomQuestions"
          // error={errors.isRandomQuestions}
        />

        <div className="w-100">
          <TextField
            // label="Ответ:"
            name="answer"
            value={answer.answer}
            // {data.testName}
            //onChange={handleChange}
            // error={errors.testName}
            //   autoFocus
          />
        </div>
      </div>
    ));
  };
  return (
    <div className="container " style={{ marginTop: "1px" }}>
      <div className="card-body ">
        <form>
          <TextAreaField
            // label="Описание:"
            name="description"
            value="текст вопроса"
            //{data.description}
            // onChange={handleChange}
            // error={errors.description}
          />
          <SelectField
            // onChange={handleChange}
            // options={departmentOptions}
            name="typeOfQuestions"
            defaultOption="Выберите тип ответов..."
            // error={errors.department}
            // value={data.department}
            label="Выберите тип ответов..."
          />
          <label className="text-muted mb-2">Ответы:</label>
          {renderAnswers(answers)}
          <div className="text-end">
            <button
              className="btn btn-success me-2"
              onClick={handleClickAddAnswer}
            >
              Добавить ответ
            </button>
            <button
              onClick={handleClickSaveAnswer}
              className="btn btn-primary me-2"
            >
              Сохранить вопрос
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
