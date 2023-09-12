import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  // const { currentUser } = useAuth();
  // console.log("children", children);
  const isLoggedIn = useSelector(getIsLoggedIn());
  console.log("isLoggedIn", isLoggedIn);
  if (!isLoggedIn) {
    // return <Navigate to="/login" />;
    return <Navigate to={{ pathname: "/login" }} />;
    //,state:{props.location}
  }
  return <Navigate to={{ pathname: "/main/home" }} />;
};

export default ProtectedRoute;
