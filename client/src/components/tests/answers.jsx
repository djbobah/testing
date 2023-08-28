import React, { useState } from "react";

import TextField from "../common/form/textField";

import CheckBoxField from "../common/form/checkBoxField";

const Answers = ({ answer, onSave }) => {
  const [data, setData] = useState({ answer: "", isTrue: false });

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    // console.log("target", target);
  };

  return (
    <div className="d-flex fs-4 " key={answer.id}>
      <CheckBoxField
        value={data.isTrue}
        //{data.isRandomQuestions}
        // onChange={(target) => handleChangeAnswer(target, answer.id)}
        onChange={handleChange}
        name="isTrue"
        // error={errors.isRandomQuestions}
      />

      <div className="w-100">
        <TextField
          // label="Ответ:"
          id={data.id}
          name="answer"
          value={data.answer}
          // {data.testName}
          // onChange={(target) => handleChangeAnswer(target, answer.id)}
          onChange={handleChange}

          // error={errors.testName}
          //   autoFocus
        />
      </div>
    </div>
  );
};

export default Answers;
