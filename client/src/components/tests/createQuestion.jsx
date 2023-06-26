import React from "react";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
const CreatrQuestion = () => {
  return (
    <form>
      <TextAreaField
        // label="Описание:"
        name="description"
        value="текст вопроса"
        //{data.description}
        // onChange={handleChange}
        // error={errors.description}
      />
      <div className="d-flex">
        {" "}
        <CheckBoxField
          value="false"
          //{data.isRandomQuestions}
          // onChange={handleChange}
          name="isRandomQuestions"
          // error={errors.isRandomQuestions}
        />
        <TextField
          // label="Ответ:"
          name="answer"
          value="1"
          // {data.testName}
          //onChange={handleChange}
          // error={errors.testName}
          //   autoFocus
        />{" "}
      </div>
    </form>
  );
};

export default CreatrQuestion;
