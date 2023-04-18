import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";
import config from "../config.json";
import axios from "axios";
const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const [departments, setDepartments] = useState("");

  useEffect(() => {
    try {
      axios.get(config.apiEndpoint + "/departments").then((dep) => {
        setDepartments(dep);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log("departments", departments);
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
              <RegisterForm />
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
