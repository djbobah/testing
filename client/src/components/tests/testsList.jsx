import React, { useState } from "react";
import TestCard from "./testCard";
import { useTests } from "../hooks/useTests";
import ContainerWrapper from "../common/container";
import { useEditTest } from "../hooks/useEditTest";
const TestsList = () => {
  // const [editTest, setEditTest] = useState(false);

  const { tests } = useTests();
  console.log("tests", tests);
  const { setEdit } = useEditTest();

  const handleClickAddTest = () => {
    setEdit(false);
  };

  return (
    <ContainerWrapper>
      {/* <div className=" ms-3 me-3 mt-4"> */}{" "}
      <div className="row ">
        {/* <div class="col-11"></div> */}
        <div className="text-end">
          <i
            className="bi bi-plus-square-fill text-success fs-3 btn"
            onClick={handleClickAddTest}
          ></i>
        </div>
      </div>
      {tests ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      ) : (
        <h2>Пока доступных для прохождения тестов нет</h2>
      )}
      {/* </div> */}
    </ContainerWrapper>
  );
};

export default TestsList;
