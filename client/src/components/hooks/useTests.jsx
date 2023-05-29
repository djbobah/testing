import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import TestService from "../../services/test.service";
import { useAuth, httpAuth } from "./useAuth";

const TestsContext = React.createContext();

export const useTests = () => {
  return useContext(TestsContext);
};

const TestsProvider = ({ children }) => {
  const [tests, setTests] = useState();
  const [currentTest, setCurrentTest] = useState();

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // const navigate = useNavigate();
  const { currentUser } = useAuth();

  function errorCatcher(error) {
    // console.log(error);
    const { message } = error.response.data;
    setError(message);
  }

  async function create(newData) {
    try {
      let { data } = await httpAuth.post("/tests/create", newData);
      // console.log(data);
      data = { ...data, ...newData };
      setTests(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      // if (code === 400) {
      //   if (message === "EMAIL_EXISTS") {
      //     const errorObject = {
      //       email: "Пользователь с таким email уже существует",
      //     };
      //     throw errorObject;
      //     // setError({ email: "Пользователь с таким email уже существует" });
      //   }
      // }
    }
  }

  async function getTestsData() {
    try {
      const data = await TestService.getTests();
      // console.log("content", data);
      setTests(data);
      // const curTest = await TestService.getCurrentTest(
      //   currentUser.id_department
      // );
      // setCurrentDepartment(curDep);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getTestsData();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <TestsContext.Provider value={{ tests, currentTest, create }}>
      {!isLoading ? children : "Loading..."}
    </TestsContext.Provider>
  );
};

export default TestsProvider;
