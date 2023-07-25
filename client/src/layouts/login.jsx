import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";
import DeparmmentService from "../services/department.service";
import { useSelector } from "react-redux";
import { getDepartmments } from "../store/departments";
const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  // const [departments, setDepartments] = useState("");
  // console.log("config.apiEndpoint ", config.apiEndpoint);
  const departments = useSelector(getDepartmments());
  // useEffect(() => {
  //   try {
  //     // const dep = DeparmmentService.getDepartmments();
  //     setDepartments(dep.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              {" "}
              <h3 className="mb-4">Форма регистрации</h3>
              <RegisterForm departments={departments} />
              <p>
                Уже есть аккаунт?{" "}
                <a role="button" onClick={toggleFormType}>
                  Войдите
                </a>
              </p>
            </>
          ) : (
            <>
              {" "}
              <h3 className="mb-4">Форма входа</h3>
              <LoginForm />
              <p>
                Нет аккаунта?{" "}
                <a role="button" onClick={toggleFormType}>
                  Зарегистрируйтесь
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
