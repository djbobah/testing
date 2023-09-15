import React, { useEffect } from "react";
import { useAuth } from "../components/hooks/useAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logOut } from "../store/users";
const LogOut = () => {
  // const { logOut } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logOut(navigate));
    // logOut();
  }, []);
  return <h2>Loading...</h2>;
};

export default LogOut;
