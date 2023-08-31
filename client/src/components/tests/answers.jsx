import React, { useState } from "react";

import TextField from "../common/form/textField";

import CheckBoxField from "../common/form/checkBoxField";
import { Popover } from "bootstrap/dist/js/bootstrap.bundle";
import { useDispatch } from "react-redux";
import { deleteAnswer, updateAnswer } from "../../store/tests";

const Answers = ({ answer, onSave }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    id: answer.id,
    answer: answer.answer,
    isCorrect: answer.isCorrect,
  });
  const [isEdit, setIsEdit] = useState(false);

  console.log("answer", answer);
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    setIsEdit(true);
    console.log("target", target);
  };
  // const handleClickToggleEdit = () => {
  //   setIsEdit((prevState) => !prevState);
  // };
  const handleClickSaveAnswer = (data) => {
    setIsEdit(false);
    console.log("!!!!! SAVE ANSWER data", data);
    dispatch(updateAnswer(data));
  };

  const handleClickDeleteAnswer = (answerId) => {
    console.log("answer id", answerId);
    dispatch(deleteAnswer(answerId));
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
        // disabled={isEdit}
        value={data.isCorrect}
        //{data.isRandomQuestions}
        // onChange={(target) => handleChangeAnswer(target, answer.id)}
        onChange={handleChange}
        name="isCorrect"
        // error={errors.isRandomQuestions}
      />
      <div className="w-100">
        <TextField
          // label="Ответ:"
          // disabled={isEdit}
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

      {isEdit && (
        // ? (
        //   <div
        //     className="ms-2 text-success"
        //     role="button"
        //     onClick={handleClickToggleEdit}
        //   >
        //     <i className="bi bi-pencil-square"></i>
        //   </div>
        // ) : (
        <div
          className="ms-2 text-success"
          role="button"
          onClick={() => handleClickSaveAnswer(data)}
        >
          <i className="bi bi-save"></i>
        </div>
      )}

      <div
        className="text-danger ms-2"
        role="button"
        onClick={() => handleClickDeleteAnswer(answer.id)}
        // data-bs-container="body"
        tabIndex="0"
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
