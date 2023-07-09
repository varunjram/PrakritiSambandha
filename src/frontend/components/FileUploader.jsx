import { Button } from "primereact/button";
import React, { useRef } from "react";

const FileUploader = ({ setFiles, files }) => {
  const handleUpload = (event) => {

    console.log("event: ", event);
    const uploadedFiles = Array.from(event.target.files);
    console.log("uploadedFiles: ", { uploadedFiles, event });
    setFiles(uploadedFiles);
  };
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
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
