import React, { useState } from "react";
import CardWrapper from "../common/cardWrapper";
import Collapse from "../common/collapse";
import BlockQuoteWrapper from "../common/blockQuote";
import { useTests } from "../hooks/useTests";
import CreateTest from "./createTest";
import ContainerWrapper from "../common/container";
import { useEditTest } from "../hooks/useEditTest";

const EditTest = () => {
  const { currentTest } = useTests();
  const { edit } = useEditTest();
  console.log("currentTest", currentTest);

  // if (currentTest) {
  return (
    // <CardWrapper>
    <ContainerWrapper>
      {edit ? (
        <Collapse title={`Редактируем тест: ${currentTest?.testName}`}>
          {" "}
          <CreateTest />{" "}
        </Collapse>
      ) : (
        <CreateTest />
      )}

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
      <div className="text-end">
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
