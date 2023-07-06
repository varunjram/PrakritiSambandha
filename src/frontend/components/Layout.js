import { Button } from "primereact/button";
import React from "react";
import { useAuthentication } from "../context/AuthContext";
import { USER_LOGGED_OUT } from "../reducers/AuthReducer";
import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";
import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const { dispatch, user } = useAuthentication();
  const Navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-content-between">
        <h2 className="m-2 ml-6 ">Prakriti</h2>
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
      <main className="flex surface-100">
        <LeftSideContent />
        <div className="flex-grow-1 border-1 p-5 w-6">{children}</div>
        <RightSideContent />
      </main>
    </div>
  );
}

export default Layout;
