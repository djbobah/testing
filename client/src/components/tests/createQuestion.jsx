import React, { useEffect, useState } from "react";
import TextAreaField from "../common/form/textAreaField";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import Collapse from "../common/collapse";
import SelectField from "../common/form/selectField";
import { useAnswers } from "../hooks/useAnswers";
import { useDispatch, useSelector } from "react-redux";
import { getTypeOfAnswers } from "../../store/typeOfAnswers";
import {
  deleteQuestion,
  loadCurrentQuestionAnswers,
  getCurrentTestQuestions,
  updateQuestion,
  getCurrentQuestionAnswers,
  createAnswer,
} from "../../store/tests";
import Answers from "./answers";

const CreateQuestion = ({ onSave, question, idx, show }) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch(loadCurrentQuestionAnswers(question.id));
  // }, []);
  console.log("question", question);
  let answers = useSelector(getCurrentQuestionAnswers(question.id));
  // const answers = [];
  const [answersData, setAnswersData] = useState(answers);
  // useEffect(() => {
  //   setAnswersData(answers);
  // }, []);
  console.log("answers", answers);
  // console.log("qData2", qTest2);

  const [data, setData] = useState({
    ...question,
    answers: [],
  });
  // setData((prevState) => ({ ...prevState, ["answers"]: answers }));

  const typeOfAnswers = useSelector(getTypeOfAnswers());
  const typeOfAnswersOptions = typeOfAnswers?.map((type) => {
    // console.log("data", data);
    // if (type.description === "1") {
    // console.log("1");
    return {
      name: type.name,
      value: type.id,
    };
    // }
  });

  console.log("!data answers", data.answers);
  console.log("!!answersData", answersData);
  console.log("!!!data ", data);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    // console.log("target", target);
  };
  const handleChangeAnswer = (target, id) => {
    const updatedAnswers = answers.map((item) => {
      console.log("item.id", item.id);
      console.log("target.id", target);
      console.log("id", id);
      if (item.id === id) {
        console.log("target.name", target.name);
        return { ...item, [target.name]: target.value };
      } else return item;
    });

    // setAnswersData(updatedAnswers);
    console.log("updatedAnswers", updatedAnswers);
  };
  const handleClickAddAnswer = (e) => {
    e.preventDefault();
    // create()
    dispatch(
      createAnswer({
        idTest: question.idTest,
        idQuestion: question.id,
        answer: "",
        isCorrect: false,
        cost: 0,
      })
    );
    // const ans = dispatch(loadCurrentQuestionAnswers(question.id));
    // console.log("ans", ans);
    // const addAnswer = { id: 3, answer: "lorem30", isTrue: false };
    // const addAnswer = [...data.answers];
    // addAnswer.push({ answer: "", isTrue: false });
    // setData((prevState) => ({
    //   ...prevState,
    //   answers: addAnswer,
    // }));
    // setAnswers([...answers, { answer: "", isTrue: false }]);
    // answers.push();
    // console.log(answers);
  };
  const handleClickSaveQuestion = (e) => {
    e.preventDefault();
    // dispatch
    onSave(data);
  };
  const handleClickDeleteQuestion = (questionId) => {
    console.log(questionId);
    dispatch(deleteQuestion(questionId));
  };

  const renderAnswers = (answers) => {
    console.log("ans", answers);
    return answers?.map((answer) => (
      <div className="d-flex fs-4 " key={answer.id}>
        <CheckBoxField
          value={answer.isTrue}
          //{data.isRandomQuestions}
          onChange={(target) => handleChangeAnswer(target, answer.id)}
          name="isTrue"
          // error={errors.isRandomQuestions}
        />

        <div className="w-100">
          <TextField
            // label="Ответ:"
            id={answer.id}
            name="answer"
            value={answer.answer}
            // {data.testName}
            onChange={(target) => handleChangeAnswer(target, answer.id)}
            // error={errors.testName}
            //   autoFocus
          />
        </div>
      </div>
    ));
  };

  // useEffect(() => {
  //   // console.log("useEff", answers);
  //   renderAnswers(answers);
  // }, [answersData]);

  console.log("show", show);

  return (
    <Collapse
      key={question.id}
      title={`Вопрос №: ${idx + 1} ${question.question}`}
      open={!question.save}
      // open={openQuestion}
    >
      <div className="container " style={{ marginTop: "1px" }}>
        <div className="card-body ">
          <form>
            <TextAreaField
              label="Текст вопроса:"
              name="question"
              value={data.question}
              //{data.description}
              onChange={handleChange}
              // error={errors.description}
            />
            <SelectField
              onChange={handleChange}
              options={typeOfAnswersOptions}
              name="typeOfAnswers"
              defaultOption="Выберите тип ответов..."
              // error={errors.department}
              value={data.typeOfAnswers}
              label="Выберите тип ответов..."
            />
            <label className="text-muted mb-2">Ответы:</label>
            <div className="text-muted d-flex justify-content-between">
              <div>
                Правильный
                <br /> ответ
              </div>
              <div>Текст ответа</div>
              <div>Операции</div>
            </div>
            {answers &&
              answers.map((answer) => {
                return <Answers answer={answer} />;
              })}
            <div className="text-end">
              <button
                className="btn btn-success me-2"
                onClick={handleClickAddAnswer}
              >
                Добавить ответ
              </button>
              <button
                type="submit"
                onClick={handleClickSaveQuestion}
                className="btn btn-primary me-2"
              >
                Сохранить вопрос
              </button>
              <button
                type="button"
                onClick={() => handleClickDeleteQuestion(question.id)}
                className="btn btn-danger me-2"
              >
                Удалить вопрос
              </button>
            </div>
          </form>
        </div>
      </div>
    </Collapse>
  );
};

export default CreateQuestion;
