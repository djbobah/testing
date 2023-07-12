import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import QuestionsService from "../../services/questions.service";
import { useAuth, httpAuth } from "./useAuth";
import { useTests } from "./useTests";

const QuestionsContext = React.createContext();

export const useQuestions = () => {
  return useContext(QuestionsContext);
};

const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  // const [currentTest, setCurrentTest] = useState();

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { currentTest } = useTests();

  function errorCatcher(error) {
    // console.log(error);
    const { message } = error.response.data;
    setError(message);
  }

  async function createQuestion(newData) {
    // console.log("create new answer DATA", newData);
    try {
      let { data } = await httpAuth.post("/questions/create", newData);

      // data = { ...data, ...newData };
      // console.log("tests", tests);
      console.log("currentTest.id", data.newQuestion.idTest);

      getQuestionsData(data.newQuestion.idTest);
      // getTestsData();
      return data;
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
    }
  }
  // async function getCurrentTest(id) {
  //   try {
  //     const data = await TestService.getCurrentTest(id);
  //     console.log("content", data);
  //     // setTests(data);
  //     // const curTest = await TestService.getCurrentTest(
  //     //   currentUser.id_department
  //     // );
  //     // setCurrentDepartment(curDep);
  //   } catch (error) {
  //     errorCatcher(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  async function getQuestionsData(idTest) {
    try {
      console.log("idTest", idTest);
      const data = await QuestionsService.getQuestionsForTest(idTest);

      console.log("getQuestionData", data);

      setQuestions(data);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getQuestionsData();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <QuestionsContext.Provider
      value={{ questions, createQuestion, getQuestionsData }}
    >
      {!isLoading ? children : "Loading..."}
    </QuestionsContext.Provider>
  );
};

export default QuestionsProvider;
