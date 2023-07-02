import { Button } from "primereact/button";
import React, { useRef, useState } from "react";

const FileUploader = ({ setFiles, files }) => {
  const handleUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);
  };
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the click event on the hidden file input
  };

  return (
    <>
      <Button
        onClick={handleButtonClick}
        text
        rounded
        icon={"bi bi-image"}
      />
      <input
        type="file"
        onChange={handleUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
    </>
  );
};

export default FileUploader;
