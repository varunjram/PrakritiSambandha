import React, { createContext, useContext, useReducer, useEffect } from "react";
import AppReducer, { UPDATE_APP_STATE, appInitialState } from "../reducers/AppReducer";
import { getAllPosts, getAllUsers } from "../services";
import { deleteLocalStorageItemsStartsWith } from "../helperFunctions";
const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, appInitialState);

  const context = { ...state, dispatch };

  const updateAppState = (key, value) =>
    dispatch({ type: UPDATE_APP_STATE, payload: { key: key, value: value } });

  useEffect(() => {
    const _token = localStorage.getItem("socialToken");
    getAllUsers(updateAppState);
    getAllPosts(updateAppState);
    dispatch({ type: UPDATE_APP_STATE, payload: { key: "authToken", value: _token } });
  }, []);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
