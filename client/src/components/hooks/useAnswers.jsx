import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import AnswersService from "../../services/answers.service";
import { useAuth, httpAuth } from "./useAuth";

const AnswersContext = React.createContext();

export const useAnswers = () => {
  return useContext(AnswersContext);
};

const AnswersProvider = ({ children }) => {
  const [answers, setAnswers] = useState();
  // const [currentTest, setCurrentTest] = useState();

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const { currentUser } = useAuth();

  function errorCatcher(error) {
    // console.log(error);
    const { message } = error.response.data;
    setError(message);
  }

  async function create(newData) {
    console.log("create new answer DATA", newData);
    try {
      let { data } = await httpAuth.post("/answers/create", newData);

      // data = { ...data, ...newData };
      // console.log("tests", tests);
      console.log("data", data.newTest);

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
  async function getAnswersData(idQuestion) {
    try {
      const data = await AnswersService.getAnswersCurrentQuestion(idQuestion);
      setAnswers(data);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  // useEffect(() => {
  //   getTestsData();
  // }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <AnswersContext.Provider value={{ answers, create, getAnswersData }}>
      {!isLoading ? children : "Loading..."}
    </AnswersContext.Provider>
  );
};

export default AnswersProvider;
