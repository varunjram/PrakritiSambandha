import React from "react";

const AuthState = {
  user: {},
  isLoggedIn: false,
};

function AuthReducer(state, { type, payload }) {
  switch (type) {
    case "USER_LOGGED_IN":
      return { ...state, isLoggedIn: true, user: payload };
    default:
      break;
  }
}

const USER_LOGGED_IN = "USER_LOGGED_IN",
  USER_LOGGED_OUT = "USER_LOGGED_OUT";
export { AuthState, USER_LOGGED_IN, USER_LOGGED_OUT };
export default AuthReducer;
