import React from "react";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import SelectField from "../common/form/selectField";
const CreateQuestion = () => {
  const answers = [
    { id: 1, answer: "lorem10", isTrue: true },
    { id: 2, answer: "lorem20", isTrue: false },
  ];
  const handleClickAddAnswer = (params) => {};
  const renderAnswers = (answers) => {
    return answers.map((answer) => (
      <div className="d-flex fs-4 ">
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
            <button className="btn btn-primary me-2">Сохранить вопрос</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
