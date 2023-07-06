import React, { useEffect, useState } from "react";
import CardWrapper from "../common/cardWrapper";
import Collapse from "../common/collapse";
import BlockQuoteWrapper from "../common/blockQuote";
import { useTests } from "../hooks/useTests";
import CreateTest from "./createTest";
import ContainerWrapper from "../common/container";
import { useEditTest } from "../hooks/useEditTest";
import CreateQuestion from "./createQuestion";

const questionsArr = [
  { id: 1, description: "description of test", typeOfQuestions: 1 },
];

const EditTest = () => {
  const [questions, setQuestions] = useState(questionsArr);
  const { currentTest } = useTests();
  const { edit } = useEditTest();

  console.log("currentTest", currentTest);

  function RenderTest(currentTest) {
    // console.log("questionsLength", questionsLength);
    return (
      <>
        <Collapse title={`Редактируем тест: ${currentTest?.testName}`}>
          <CreateTest />
        </Collapse>

        {questions.map((question, idx) => {
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
    RenderTest();
  }, [questions]);
  const handleClickAddQuestion = (e) => {
    e.preventDefault();
    questionsArr.push({
      // id: 3,
      description: "description of test 4",
      typeOfQuestions: 2,
    });
    setQuestions(questionsArr);
    console.log(questions);
  };
  // if (currentTest) {
  return (
    // <CardWrapper>
    <ContainerWrapper>
      {edit ? RenderTest(currentTest) : <CreateTest />}

      {/* <Collapse title="sdfsdf"> */}

      {/* <BlockQuoteWrapper>
          <p>
            Аргументы: callBack, [array of dependencies]
            <br />
            Возвращает: Закэшированное значение выполненной функции, которое
            обновляется только при изменении зависимостей.
          </p>

          <figcaption>
            <cite title="reactjs.org">reactjs.org</cite>
          </figcaption>
        </BlockQuoteWrapper> */}
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
