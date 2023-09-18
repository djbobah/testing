import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logOut } from "../store/users";
const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logOut(navigate));
    // logOut();
  }, []);
  return <h2>Loading...</h2>;
};

export default LogOut;
