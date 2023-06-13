import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

import TestService from "../../services/test.service";
import { useAuth, httpAuth } from "./useAuth";
import UserService from "../../services/user.service";

const UsersContext = React.createContext();

export const useUsers = () => {
  return useContext(UsersContext);
};

const UsersProvider = ({ children }) => {
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

  async function getUserData(userId) {
    try {
      // console.log("use users userId", userId);

      const data = await UserService.getUserDataById(userId);
      // console.log("use users getUserData", data);
      // setTests(data);
      // const curTest = await TestService.getCurrentTest(
      //   currentUser.id_department
      // );
      // setCurrentDepartment(curDep);
      return data;
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <UsersContext.Provider value={{ getUserData }}>
      {!isLoading ? children : "Loading..."}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
