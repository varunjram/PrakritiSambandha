import { createContext, useContext, useReducer } from "react";
import AuthReducer, { AuthState } from "../reducers/AuthReducer";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, AuthState);

  const context = {
    ...state,
    dispatch,
  };
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
const useAuthentication = () => useContext(AuthContext);

export { useAuthentication };

export default AuthContextProvider;
