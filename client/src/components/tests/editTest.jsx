import React, { useEffect, useState } from "react";
import CardWrapper from "../common/cardWrapper";
import Collapse from "../common/collapse";
import BlockQuoteWrapper from "../common/blockQuote";
import CreateTest from "./createTest";
import ContainerWrapper from "../common/container";
import CreateQuestion from "./createQuestion";
import { useQuestions } from "../hooks/useQuestions";
import { useSelector } from "react-redux";
import {
  getCurrentTest,
  getCurrentTestQuestions,
  getIsEditTest,
} from "../../store/tests";
// import { getQuestions } from "../../store/questions";

// const questionsArr = [
//   { id: 1, description: "description of test", typeOfQuestions: 1 },
// ];

const EditTest = () => {
  // const [questions, setQuestions] = useState({});
  const currentTest = useSelector(getCurrentTest());
  const edit = useSelector(getIsEditTest());
  const [errors, setErrors] = useState({});

  const { createQuestion } = useQuestions();

  // console.log(currentTest);
  console.log("edit test currentTest", currentTest);
  let questions = "";
  questions = useSelector(getCurrentTestQuestions());

  // const questions = useSelector(getQuestions(currentTest?.id));

  console.log("edit test currentTest questions", questions);

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
                  title={`Вопрос №: ${currentTest?.testName}`}
                  open={true}
                >
                  <CreateQuestion />
                </Collapse>
              );
            } else {
              return (
                <Collapse
                  key={question.id}
                  title={`Вопрос №: ${currentTest?.testName}`}
                >
                  <CreateQuestion />
                </Collapse>
              );
            }
          })}
      </>
    );
  }
  useEffect(() => {
    RenderTest(currentTest);
  }, [questions]);
  const handleClickAddQuestion = async (e) => {
    e.preventDefault();

    try {
      console.log("try create question");
      await createQuestion({
        idTest: currentTest.id,
        question: "",
        typeOfAnswers: 0,
        cost: 0,
      });
    } catch (error) {
      setErrors(error);
    }

    // questionsArr.push({
    //   // id: 3,
    //   description: "description of test 4",
    //   typeOfQuestions: 2,
    // });
    // setQuestions(questionsArr);
    console.log(questions);
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
