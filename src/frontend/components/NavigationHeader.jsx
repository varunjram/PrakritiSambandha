import { Button } from "primereact/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthContext";
import SearchUsers from "./SearchUsers";
import { USER_LOGGED_OUT } from "../reducers/AuthReducer";

const NavigationHeader = () => {
  const { dispatch, user } = useAuthentication();
  const Navigate = useNavigate();
  return (
    <div
      className="flex justify-content-between sticky top-0  z-5 text-white     "
      style={{ backgroundColor: "#483C32" }}>
      <h2 className="ml-2 m-2 md:ml-6 ">Prakriti</h2>
      <span className="md:hidden w-5 m-auto">
        <SearchUsers />
      </span>
      <div>
        <Button
          icon="bi bi-person-circle"
          text
          className="text-3xl m-0 p-0 mr-3"
          onClick={() => Navigate(`/profile/${user?.username}/${user?._id}`)}
        />
        <Button
          icon="bi bi-box-arrow-right"
          text
          className="text-3xl m-0 p-0 mr-3"
          onClick={() => {
            dispatch({ type: USER_LOGGED_OUT });
          }}
        />
      </div>
    </div>
  );
};

export default NavigationHeader;
