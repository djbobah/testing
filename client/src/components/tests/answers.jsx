import React, { useState } from "react";

import TextField from "../common/form/textField";

import CheckBoxField from "../common/form/checkBoxField";
import { Popover } from "bootstrap/dist/js/bootstrap.bundle";

const Answers = ({ answer, onSave }) => {
  const [data, setData] = useState({ answer: "", isTrue: false });
  const [isEdit, setIsEdit] = useState(true);

  console.log("answer", answer);
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    // console.log("target", target);
  };
  const handleClickToggleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  const handleClickDeleteAnswer = (answerId) => {
    console.log("answer id", answerId);
  };

  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new Popover(popoverTriggerEl)
  );
  return (
    <div className="d-flex fs-4 " key={answer.id}>
      <CheckBoxField
        disabled={isEdit}
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
          disabled={isEdit}
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

      {isEdit ? (
        <div
          className="ms-2 text-success"
          role="button"
          onClick={handleClickToggleEdit}
        >
          <i className="bi bi-pencil-square"></i>
        </div>
      ) : (
        <div
          className="ms-2 text-success"
          role="button"
          onClick={handleClickToggleEdit}
        >
          <i class="bi bi-save"></i>
        </div>
      )}

      <div
        className="text-danger ms-2"
        role="button"
        onClick={() => handleClickDeleteAnswer(answer.id)}
        // data-bs-container="body"
        tabindex="0"
        // data-bs-toggle="popover"
        data-bs-placement="top"
        data-bs-trigger="hover focus"
        data-bs-content="Удалить ответ"
      >
        <i className="bi bi-x-square-fill"></i>
      </div>
    </div>
  );
};

export default Answers;
