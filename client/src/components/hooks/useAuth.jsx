import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import config from "../../config.json";

// axios.defaults.baseURL = config.apiEndpoint;
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  async function signUp({ email, password }) {
    const url = config.apiEndpoint;
    const { data } = await axios.post(url + "/auth/signUp", {
      email,
      password,
    });
    console.log(data);
  }
  return (
    <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
