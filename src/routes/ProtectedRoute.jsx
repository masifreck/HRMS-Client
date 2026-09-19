import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../app/hooks";

const ProtectedRoute = () => {
  const location = useLocation();

  const {
    isAuthenticated,
    token,
  } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;