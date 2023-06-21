import React, { createContext, useContext, useReducer, useEffect } from "react";
import AppReducer, { UPDATE_APP_STATE, appInitialState } from "../reducers/AppReducer";
import { getAllPosts, getAllUsers } from "../services";
const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, appInitialState);
  console.log("state: ", state);
  const context = { ...state, dispatch };

  const updateAppState = (key, value) =>
    dispatch({ type: UPDATE_APP_STATE, payload: { key: key, value: value } });

  useEffect(() => {
    getAllUsers(updateAppState);
    getAllPosts(updateAppState);
  }, []);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
