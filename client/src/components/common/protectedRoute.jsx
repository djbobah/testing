import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUser, getIsLoggedIn } from "../../store/users";
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  // console.log("children", children);
  const currentUser = useSelector(getCurrentUser());
  console.log("protected route currentUser", currentUser);
  if (!currentUser) {
    // return <Navigate to="/login" />;
    return <Navigate to={{ pathname: "/login" }} />;
    //,state:{props.location}
  }
  // return <Navigate to={{ pathname: "/main/home" }} />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
