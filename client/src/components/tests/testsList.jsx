import React, { useEffect, useState } from "react";
import TestCard from "./testCard";
import ContainerWrapper from "../common/container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTests, loadTests, setCurrentTest } from "../../store/tests";
import { useAuth } from "../hooks/useAuth";
const TestsList = () => {
  // const [editTest, setEditTest] = useState(false);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTests());
  }, []);

  // console.log("tests", tests);
  const tests = useSelector(getTests());
  console.log("tests", tests);

  const handleClickAddTest = (e) => {
    // e.preventDefault();
    // dispatch(setCurrentTest(null));
    // setCurrentTest(undefined);
  };

  return (
    <ContainerWrapper>
      {/* <div className=" ms-3 me-3 mt-4"> */}{" "}
      <div className="row ">
        {/* <div class="col-11"></div> */}
        {currentUser.roles !== "user" && (
          <div className="text-end">
            <Link
              to="/main/createTest"
              // className="text-muted btn"
              onClick={() => handleClickAddTest}
              // id={test.id}
            >
              <i
                className="bi bi-plus-square-fill text-success fs-3 btn"
                onClick={handleClickAddTest}
              ></i>
            </Link>
          </div>
        )}
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
