import React, { useState } from "react";
import CardWrapper from "../common/cardWrapper";
import Collapse from "../common/collapse";
import BlockQuoteWrapper from "../common/blockQuote";
import { useTests } from "../hooks/useTests";
import CreateTest from "./createTest";
import ContainerWrapper from "../common/container";

const EditTest = () => {
  const { currentTest } = useTests();
  console.log("currentTest", currentTest);

  if (currentTest) {
    return (
      // <CardWrapper>
      <ContainerWrapper>
        <Collapse title={currentTest.testName}>
          {/* <Collapse title="sdfsdf"> */}
          <CreateTest currentTest={currentTest} />
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
        </Collapse>
      </ContainerWrapper>
      // {/* </CardWrapper> */}
    );
  } else {
    return "loading";
  }
};

export default EditTest;
