import React from "react";
import LeftSideContent from "./LeftSideContent";
import NavigationHeader from "./NavigationHeader";
import RightSideContent from "./RightSideContent";

function Layout({ children }) {
  return (
    <div>
      <NavigationHeader />
      <main
        className="flex surface-100 "
        style={{ minHeight: "calc(100vh - 48.8px)" }}>
        <LeftSideContent />
        <div className="p-3 flex-grow-1 border-1 w-6 md:p-5 ">{children}</div>
        <RightSideContent />
      </main>
    </div>
  );
}
// #3D2B1F

export default Layout;
