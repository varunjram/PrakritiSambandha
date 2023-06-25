import { Button } from "primereact/button";
import React from "react";
import { useAuthentication } from "../context/AuthContext";
import { USER_LOGGED_OUT } from "../reducers/AuthReducer";
import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";

function Layout({ children }) {
  const { dispatch } = useAuthentication();
  return (
    <div>
      <div className="flex justify-content-between">
        <h2 className="m-2 ml-6 ">Prakriti</h2>
        <Button
          icon="bi bi-log-out"
          label="Logout"
          onClick={() => {
            dispatch({ type: USER_LOGGED_OUT });
          }}
        />
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
