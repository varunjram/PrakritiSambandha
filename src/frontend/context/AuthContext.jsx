import { createContext, useContext, useEffect, useReducer } from "react";
import AuthReducer, { AuthState } from "../reducers/AuthReducer";

import { USER_LOGGED_IN } from "../reducers/AuthReducer";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, AuthState);

  const context = {
    ...state,
    dispatch,
  };

  useEffect(() => {
    const _user = JSON.parse(localStorage.getItem("socialUser"));
    const token = localStorage.getItem("socialToken");
    if (_user?._id && token) {
      dispatch({ type: USER_LOGGED_IN, payload: { user: _user, token } });
    }
  }, []);

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
const useAuthentication = () => useContext(AuthContext);

export { useAuthentication };

export default AuthContextProvider;
