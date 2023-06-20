import React, { createContext, useContext, useReducer, useEffect } from "react";
import AppReducer, { GET_USERS, appInitialState } from "../reducers/AppReducer";
import { getAllUsers } from "../services";
const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, appInitialState);
  const context = { ...state, dispatch };

  const getUsers = (users) => dispatch({ type: GET_USERS, payload: users });

  useEffect(() => {
    getAllUsers(getUsers);
  }, []);
  
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
