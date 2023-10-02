import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../store/users";
const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logOut(navigate));
    // logOut();
  }, []);
  // navigate("/");
  return <h2>Loading...</h2>;
};

export default LogOut;
