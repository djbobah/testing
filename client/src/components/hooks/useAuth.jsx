import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../config.json";
import httpService from "../../services/http.service";
import localStorageService, {
  setTokens,
} from "../../services/localStorage.service";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";

// axios.defaults.baseURL = config.apiEndpoint;

export const httpAuth = axios.create({ baseURL: config.apiEndpoint });
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post("/auth/signInWithPassword", {
        email,
        password,
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      const { code, message } = error.response.data.error;

      errorCatcher(error);
      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND") {
          throw new Error("Email или пароль введен некорректно");
        }
        if (message === "INVALID_PASSWORD") {
          throw new Error("Email или пароль введен некорректно");
        }
      }
    }
  }
  function logOut() {
    localStorageService.removeAuthData();
    setCurrentUser(null);
    navigate("/");
  }
  async function signUp(newData) {
    // const url = config.apiEndpoint;
    try {
      let { data } = await httpAuth.post("/auth/signUp", newData);
      //  console.log(data);
      setTokens(data);
      data = { ...data, ...newData };
      setCurrentUser(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким email уже существует",
          };
          throw errorObject;
          // setError({ email: "Пользователь с таким email уже существует" });
        }
      }
    }
  }

  async function updateUser(newData) {
    // const url = config.apiEndpoint;
    try {
      let { data } = await httpAuth.patch("/users/" + currentUser.id, newData);
      // console.log("auth update user", data);
      //setTokens(data);
      // data = { ...data, ...newData };
      console.log("newData", newData);
      // console.log("currentUser before", currentUser);
      await getUserData();
      // console.log("currentUser", currentUser);
      // console.log("currentUser", currentUser);
      //setCurrentUser(data);
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким email уже существует",
          };
          throw errorObject;
          // setError({ email: "Пользователь с таким email уже существует" });
        }
      }
    }
  }

  function errorCatcher(error) {
    // console.log(error);
    const { message } = error.response.data;
    setError(message);
  }

  async function getUserData() {
    try {
      const { data } = await UserService.getCurrentUser();
      console.log("content", data);
      console.log("currentUser", currentUser);
      setCurrentUser(data);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <AuthContext.Provider
      value={{ signUp, logIn, currentUser, logOut, updateUser }}
    >
      {!isLoading ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
