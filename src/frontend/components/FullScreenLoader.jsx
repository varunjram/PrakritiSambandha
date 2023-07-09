import React from "react";

const FullScreenLoader = () => {
  return (
    <div
      className="flex justify-content-center align-items-center"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.7)",
        transition: "opacity 0.2s",
        overflow: "hidden",
      }}>
      <div className="w-4 ">
        <img
          src="/assets/images/leaf-spinner2.gif"
          height="100%"
          width="100%"
          alt="loading gif"
        />
      </div>
    </div>
  );
};
export default FullScreenLoader;
