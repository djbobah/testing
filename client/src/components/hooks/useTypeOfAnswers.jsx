import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import TypeOfAnswersService from "../../services/typeOfAnswers.service";
import { useAuth } from "./useAuth";

const TypeOfAnswersContext = React.createContext();

export const useTypeOfAnswers = () => {
  return useContext(TypeOfAnswersContext);
};

const TypeOfAnswersProvider = ({ children }) => {
  const [typeOfAnswers, setTypeOfAnswers] = useState();
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

  async function getTypeOfAnswersData() {
    try {
      const data = await TypeOfAnswersService.getTypeOfAnswers();
      // console.log("content", data);
      setTypeOfAnswers(data);
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
    getTypeOfAnswersData();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <TypeOfAnswersContext.Provider value={{ typeOfAnswers }}>
      {!isLoading ? children : "Loading..."}
    </TypeOfAnswersContext.Provider>
  );
};

export default TypeOfAnswersProvider;
