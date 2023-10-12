import React, { useEffect, useState } from "react";
import TestCard from "./testCard";
import ContainerWrapper from "../common/container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTests, loadTests, setCurrentTest } from "../../store/tests";
import { getCurrentUser } from "../../store/users";
import ModalBeforeTest from "./modalBeforeTest";
const TestsList = () => {
  // const [editTest, setEditTest] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTest, setCurrentTestState] = useState(null);
  const currentUser = useSelector(getCurrentUser());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTests());
  }, []);

  // console.log("tests", tests);
  const tests = useSelector(getTests());
  // console.log("tests", tests);

  const handleClickAddTest = (e) => {
    // e.preventDefault();
    // dispatch(setCurrentTest(null));
    // setCurrentTest(undefined);
  };
  const handleClickStartTest = (id) => {
    // console.log("start test id", id);
    // const test = tests.filter((item) => item.id === id);
    // console.log(test);
    setCurrentTestState(tests.filter((item) => item.id === id));
    // dispatch(setCurrentTest(id));
    setShowModal(true);
    dispatch(setCurrentTest(id));
  };
  const handleClickCloseModal = () => {
    console.log("start test");
    setShowModal(false);
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
          {tests.map((test) => {
            // console.log(test, currentUser);
            if (test.isPublished) {
              return (
                <TestCard
                  key={test.id}
                  test={test}
                  onTest={handleClickStartTest}
                />
              );
            } else if (test.authorId === currentUser.id) {
              return (
                <TestCard
                  key={test.id}
                  test={test}
                  onTest={handleClickStartTest}
                />
              );
            } else <h2>Пока доступных для прохождения тестов нет</h2>;
          })}
        </div>
      ) : (
        <h2>Пока доступных для прохождения тестов нет</h2>
      )}
      {/* </div> */}
      {currentTest && (
        <ModalBeforeTest
          show={showModal}
          onClose={handleClickCloseModal}
          test={currentTest}
        />
      )}
    </ContainerWrapper>
  );
};

export default TestsList;
