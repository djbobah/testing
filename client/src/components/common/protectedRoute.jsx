import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth();
  console.log("children", children);
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
