import React, { useEffect, useState } from "react";
import CardWrapper from "../common/cardWrapper";
import Collapse from "../common/collapse";
import BlockQuoteWrapper from "../common/blockQuote";
import CreateTest from "./createTest";
import ContainerWrapper from "../common/container";
import CreateQuestion from "./createQuestion";
import { useQuestions } from "../hooks/useQuestions";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuestion,
  createQuestion,
  getCurrentTest,
  getCurrentTestQuestions,
  getIsEditTest,
  updateQuestion,
} from "../../store/tests";
// import { getQuestions } from "../../store/questions";

// const questionsArr = [
//   { id: 1, description: "description of test", typeOfQuestions: 1 },
// ];

const EditTest = () => {
  const dispatch = useDispatch();
  // const [questions, setQuestions] = useState({});
  const currentTest = useSelector(getCurrentTest());
  const edit = useSelector(getIsEditTest());
  const [errors, setErrors] = useState({});
  // const [openQuestion, setOpenQuestion] = useState(true);

  // const { createQuestion } = useQuestions();

  // console.log(currentTest);
  // console.log("edit test currentTest", currentTest);
  let questions = "";
  questions = useSelector(getCurrentTestQuestions());

  // const questions = useSelector(getQuestions(currentTest?.id));
  // if (questions) {
  //   console.log("edit test currentTest questions", questions);
  // }

  const handleClickSave = (id, data) => {
    console.log("handleClickSave data", data);
    // console.log("open", openQuestion);
    dispatch(updateQuestion(id, data));
    // setOpenQuestion((prevState) => !prevState);
  };

  function RenderTest(currentTest) {
    // console.log("questionsLength", questionsLength);
    return (
      <>
        <Collapse title={`Редактируем тест: ${currentTest?.testName}`}>
          <CreateTest currentTest={currentTest} />
        </Collapse>

        {questions &&
          questions.map((question, idx) => {
            // console.log(idx);
            // разворачиваем последний вопрос
            if (questions.length === idx + 1) {
              // console.log("true");
              return (
                <Collapse
                  key={question.id}
                  title={`Вопрос №: ${idx + 1}`}
                  open={!question.save}
                >
                  <CreateQuestion
                    question={question}
                    onSave={(data) => handleClickSave(question.id, data)}
                  />
                </Collapse>
              );
            } else {
              return (
                <Collapse
                  key={question.id}
                  title={`Вопрос №: ${idx + 1}`}
                  open={!question.save}
                  // open={openQuestion}
                >
                  <CreateQuestion
                    question={question}
                    onSave={(data) => handleClickSave(question.id, data)}
                  />
                </Collapse>
              );
            }
          })}
      </>
    );
  }
  useEffect(() => {
    RenderTest(currentTest);
    console.log("rerender");
  }, [questions]);

  const handleClickAddQuestion = async (e) => {
    e.preventDefault();
    dispatch(
      createQuestion({
        idTest: currentTest.id,
        question: "",
        typeOfAnswers: 1,
        cost: 0.5,
      })
    );
    // try {
    //   console.log("try create question");
    //   await createQuestion({
    //     idTest: currentTest.id,
    //     question: "",
    //     typeOfAnswers: 0,
    //     cost: 0,
    //   });
    // } catch (error) {
    //   setErrors(error);
    // }

    // questionsArr.push({
    //   // id: 3,
    //   description: "description of test 4",
    //   typeOfQuestions: 2,
    // });
    // setQuestions(questionsArr);
    // console.log(questions);
  };
  // if (currentTest) {
  return (
    // <CardWrapper>
    <ContainerWrapper>
      {edit ? RenderTest(currentTest) : <CreateTest />}

      {edit && (
        <div className="text-end ">
          <button className="btn btn-primary me-2">Сохранить тест</button>
          <button
            className="btn btn-secondary"
            onClick={handleClickAddQuestion}
          >
            Добавить вопрос
          </button>
        </div>
      )}
    </ContainerWrapper>
    // {/* </CardWrapper> */}
  );
  // } else {
  //   return "loading";
  // }
};

export default EditTest;
