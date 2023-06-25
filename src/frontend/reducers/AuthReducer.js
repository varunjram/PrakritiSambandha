import React from "react";

const AuthState = {
  user: {},
  isLoggedIn: false,
  authToken: localStorage.getItem("socialToken") ?? null,
};

function AuthReducer(state, { type, payload }) {
  switch (type) {
    case "USER_LOGGED_IN":
      return { ...state, isLoggedIn: true, user: payload };
    case "USER_LOGGED_OUT":
      localStorage.removeItem("socialToken");
      return { ...state, isLoggedIn: false, user: {} };
    default:
      break;
  }
}

const USER_LOGGED_IN = "USER_LOGGED_IN",
  USER_LOGGED_OUT = "USER_LOGGED_OUT";
export { AuthState, USER_LOGGED_IN, USER_LOGGED_OUT };
export default AuthReducer;
