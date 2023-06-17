import React from "react";
import LeftSideContent from "./LeftSideContent";

function Layout({ children }) {
  return (
    <div>
      <div>
        <h2 className="m-2 ml-6 ">Prakriti</h2>
      </div>
      <main className="flex surface-100">
        <LeftSideContent />
        <div className="flex-grow-1 border-1 p-5">{children}</div>
        <aside className="flex-grow-1 border-1">sidebar right</aside>
      </main>
    </div>
  );
}

export default Layout;
