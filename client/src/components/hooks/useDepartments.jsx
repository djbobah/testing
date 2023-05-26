import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import DeparmmentService from "../../services/department.service";
import { useAuth } from "./useAuth";

const DepatrmentsContext = React.createContext();

export const useDepartments = () => {
  return useContext(DepatrmentsContext);
};

const DepartmentsProvider = ({ children }) => {
  const [departments, setDepartments] = useState();
  const [currentDepartment, setCurrentDepartment] = useState();

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  // const navigate = useNavigate();
  const { currentUser } = useAuth();

  function errorCatcher(error) {
    // console.log(error);
    const { message } = error.response.data;
    setError(message);
  }

  async function getDepartmentsData() {
    try {
      const data = await DeparmmentService.getDepartmments();
      // console.log("content", data);
      setDepartments(data);
      const curDep = await DeparmmentService.getCurrentDepartment(
        currentUser.id_department
      );
      setCurrentDepartment(curDep);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getDepartmentsData();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <DepatrmentsContext.Provider value={{ departments, currentDepartment }}>
      {!isLoading ? children : "Loading..."}
    </DepatrmentsContext.Provider>
  );
};

export default DepartmentsProvider;
