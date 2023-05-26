import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import TestService from "../../services/test.service";
import { useAuth } from "./useAuth";

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
    <TestsContext.Provider value={{ tests, currentTest }}>
      {!isLoading ? children : "Loading..."}
    </TestsContext.Provider>
  );
};

export default TestsProvider;
