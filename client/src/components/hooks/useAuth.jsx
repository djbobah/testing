import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../config.json";
import httpService from "../../services/http.service";
import localStorageService, {
  setTokens,
} from "../../services/localStorage.service";
import userService from "../../services/user.service";

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

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post("/auth/signInWithPassword", {
        email,
        password,
      });
      setTokens(data);
      getUserData();
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

  async function signUp(newData) {
    // const url = config.apiEndpoint;
    try {
      const { data } = await httpAuth.post("/auth/signUp", newData);
      console.log(data);
      setTokens(data);
      setCurrentUser(data);
      console.log("data", data);
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
      const { data } = await userService.getCurrentUser();
      console.log("content", data);
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
      isLoading(false);
    }
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <AuthContext.Provider value={{ signUp, logIn, currentUser }}>
      {!isLoading ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
