import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import TypeOfQuestionsService from "../../services/typeOfQuestions.service";
import { useAuth } from "./useAuth";

const TypeOfQuestionsContext = React.createContext();

export const useTypeOfQuestions = () => {
  return useContext(TypeOfQuestionsContext);
};

const TypeOfQuestionsProvider = ({ children }) => {
  const [typeOfQuestions, setTypeOfQuestions] = useState();
  // const [currentDepartment, setCurrentDepartment] = useState();

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // const navigate = useNavigate();
  // const { currentUser } = useAuth();

  function errorCatcher(error) {
    // console.log(error);
    const { message } = error.response.data;
    setError(message);
  }

  async function getTypeOfQuestionsData() {
    try {
      const data = await TypeOfQuestionsService.getTypeOfQuestions();
      // console.log("content", data);
      setTypeOfQuestions(data);
      // const curDep = await TypeOfQuestionsService.getCurrentDepartment(
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
    getTypeOfQuestionsData();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <TypeOfQuestionsContext.Provider value={{ typeOfQuestions }}>
      {!isLoading ? children : "Loading..."}
    </TypeOfQuestionsContext.Provider>
  );
};

export default TypeOfQuestionsProvider;
