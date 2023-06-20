import React from "react";
import { useAuthentication } from "../context/AuthContext";
import { useNavigate, Navigate, useLocation } from "react-router-dom";

function AuthWrapper({ children }) {
  const { isLoggedIn } = useAuthentication();
  console.log("isLoggedIn: ", isLoggedIn);
  const Location = useLocation();
  return isLoggedIn ? (
    children
  ) : (
    <Navigate
      to="/login"
      state={{ from: Location }}
    />
  );
}

export default AuthWrapper;
