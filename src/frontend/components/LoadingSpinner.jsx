import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

export const LoadingSpinner = () => {
  return (
    <div
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
        transition: "opacity 0.2s",
      }}>
      <span style={{}}>
        <img
          src="/assets/images/leaf-spinner2.gif"
          height="100%"
          width="100%"
          alt="loading gif"
        />
      </span>
    </div>
  );
};

export default LoadingSpinner;
