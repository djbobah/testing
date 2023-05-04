import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Route } from "react-router-dom";
const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          Navigate("/login");
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

export default ProtectedRoute;
