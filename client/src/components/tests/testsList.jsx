import React from "react";
import TestCard from "./testCard";
const TestsList = () => {
  return (
    <div className=" ms-3 me-3 mt-4">
      {" "}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <TestCard /> <TestCard /> <TestCard /> <TestCard /> <TestCard />{" "}
        <TestCard /> <TestCard />
      </div>
    </div>
  );
};

export default TestsList;
