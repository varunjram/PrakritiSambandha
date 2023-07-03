const AuthState = {
  user: {},
  isLoggedIn: false,
  authToken: localStorage.getItem("socialToken") ?? null,
};

function AuthReducer(state, { type, payload }) {
  switch (type) {
    case "USER_LOGGED_IN":
      console.log("payload: ", payload);
      return { ...state, isLoggedIn: true, user: payload?.user, authToken: payload?.token };
    case "USER_LOGGED_OUT":
      localStorage.removeItem("socialToken");
      return { ...state, isLoggedIn: false, user: {} };
    case "UPDATE_BOOKMARKS":
      return { ...state, user: { ...state.user, bookmarks: payload } };
    case "UPDATE_AUTH_STATE":
      console.log("payload: ", payload);

      return { ...state, [payload?.key]: payload?.value };
    default:
      break;
  }
}

const USER_LOGGED_IN = "USER_LOGGED_IN";
const USER_LOGGED_OUT = "USER_LOGGED_OUT";
const UPDATE_BOOKMARKS = "UPDATE_BOOKMARKS";
const UPDATE_AUTH_STATE = "UPDATE_AUTH_STATE";

export { AuthState, USER_LOGGED_IN, USER_LOGGED_OUT, UPDATE_BOOKMARKS, UPDATE_AUTH_STATE };

export default AuthReducer;
