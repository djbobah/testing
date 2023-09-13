import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser, getIsLoggedIn } from "../../store/users";
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  // const { currentUser } = useAuth();
  // console.log("children", children);
  const isLoggedIn = useSelector(getCurrentUser());
  console.log("protected route currentUser", isLoggedIn);
  if (!isLoggedIn) {
    // return <Navigate to="/login" />;
    return <Navigate to={{ pathname: "/login" }} />;
    //,state:{props.location}
  }
  // return <Navigate to={{ pathname: "/main/home" }} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
