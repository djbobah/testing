import React from "react";
import CardWrapper from "../common/cardWrapper";
import Collapse from "../common/collapse";
import BlockQuoteWrapper from "../common/blockQuote";
import { useTests } from "../hooks/useTests";

const EditTest = () => {
  const { currentTest } = useTests();
  console.log("currentTest", currentTest);

  return (
    <CardWrapper>
      <Collapse title="Информация">
        <BlockQuoteWrapper>
          <p>
            Аргументы: callBack, [array of dependencies]
            <br />
            Возвращает: Закэшированное значение выполненной функции, которое
            обновляется только при изменении зависимостей.
          </p>

          <figcaption>
            <cite title="reactjs.org">reactjs.org</cite>
          </figcaption>
        </BlockQuoteWrapper>
      </Collapse>
    </CardWrapper>
  );
};

export default EditTest;
