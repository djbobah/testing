import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
// import axios from "axios";
// import config from "../../config.json";
import httpService from "../../services/http.service";
import { setTokens } from "../../services/localStorage.service";
import userService from "../../services/user.service";

// axios.defaults.baseURL = config.apiEndpoint;
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(null);
  async function signUp(newData) {
    // const url = config.apiEndpoint;
    try {
      const { data } = await httpService.post("/auth/signUp", newData);
      console.log(data);
      setTokens(data);
      setCurrentUser(data);
      console.log(userService.get());
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          setErrors({ email: "Пользователь с таким email уже существует" });
        }
      }
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }
  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);
  return (
    <AuthContext.Provider value={{ signUp, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
