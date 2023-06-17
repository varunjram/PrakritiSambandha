import React from "react";
import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";

function Layout({ children }) {
  return (
    <div>
      <div>
        <h2 className="m-2 ml-6 ">Prakriti</h2>
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
