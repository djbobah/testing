import React, { useState } from "react";
import CardWrapper from "../common/cardWrapper";
import Collapse from "../common/collapse";
import BlockQuoteWrapper from "../common/blockQuote";
import { useTests } from "../hooks/useTests";
import CreateTest from "./createTest";
import ContainerWrapper from "../common/container";
import { useEditTest } from "../hooks/useEditTest";
import CreatrQuestion from "./createQuestion";

const EditTest = () => {
  const { currentTest } = useTests();
  const { edit } = useEditTest();
  console.log("currentTest", currentTest);

  function RenderTest(currentTest) {
    return (
      <>
        <Collapse title={`Редактируем тест: ${currentTest?.testName}`}>
          {" "}
          <CreateTest />{" "}
        </Collapse>
        <Collapse title={`Вопрос №: ${currentTest?.testName}`}>
          <CreatrQuestion />
        </Collapse>
      </>
    );
  }
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

      <div className="text-end ">
        <button className="btn btn-primary me-2">Сохранить тест</button>
        <button className="btn btn-secondary">Добавить вопрос</button>
      </div>
    </ContainerWrapper>
    // {/* </CardWrapper> */}
  );
  // } else {
  //   return "loading";
  // }
};

export default EditTest;
