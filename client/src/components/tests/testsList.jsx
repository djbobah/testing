import React, { useState } from "react";
import TestCard from "./testCard";
import { useTests } from "../hooks/useTests";
const TestsList = () => {
  const [editTest, setEditTest] = useState(false);

  const { tests } = useTests();
  console.log("tests", tests);
  return (
    <div className=" ms-3 me-3 mt-4">
      {" "}
      {tests ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {tests.map((test) => (
            <TestCard
              key={test.id}
              test={test}
              edit={editTest}
              setEdit={setEditTest}
            />
          ))}
        </div>
      ) : (
        <h2>Пока доступных для прохождения тестов нет</h2>
      )}
    </div>
  );
};

export default TestsList;
