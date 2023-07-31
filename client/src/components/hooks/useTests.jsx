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
    console.log("create test new DATA", newData);
    try {
      // let { data } = await httpAuth.post("/tests/create", newData);
      const data = await TestService.create(newData);

      getTestsData();
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
  async function getTestsData() {
    try {
      const data = await TestService.getTests();
      setTests(data);
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
    <TestsContext.Provider
      value={{ tests, currentTest, setCurrentTest, create }}
    >
      {!isLoading ? children : "Loading..."}
    </TestsContext.Provider>
  );
};

export default TestsProvider;
