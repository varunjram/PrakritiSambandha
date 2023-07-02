import React, { useRef, useState } from "react";
import { Avatar } from "primereact/avatar";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { addPost } from "../services";
import { useAppContext } from "../context/AppContext";
import { UPDATE_APP_STATE } from "../reducers/AppReducer";
import { useAuthentication } from "../context/AuthContext";
import { OverlayPanel } from "primereact/overlaypanel";
import emojis from "../utils/emoji";
import { FileUpload } from "primereact/fileupload";
import FileUploader from "./FileUploader";
import axios from "axios";
// import FileUploader2 from "./FileUploader2";

const uploadButtons = [
  // {
  //   icon: "image",
  //   command: () => {
  //     alert("a");
  //   },
  // },
  {
    icon: "filetype-gif",
    command: async () => {  
      try {
        const response = await axios.post("https://freeimage.host/api/1/upload", "files", {
          params: {
            key: "6d207e02198a847aa98d0a2a901485a5",
            action: "upload",
          },
          headers: {
            "Content-Type": "image",
          },
        });
        console.log("response: ", response);
      } catch (error) {
        console.log("error: ", error);
      }
      alert("b");
    },
  },
  {
    icon: "emoji-wink",
    command: () => {
      alert("c");
    },
  },
];
function CreatePost() {
  const [value, setValue] = useState("");
  const [files, setFiles] = useState([]);
  const { dispatch } = useAppContext();
  const { authToken, user } = useAuthentication();
  const emojiRef = useRef(null);

  const updateAppState = (key, value) =>
    dispatch({ type: UPDATE_APP_STATE, payload: { key: key, value: value } });

  return (
    <section className="flex surface-0">
      <div className="p-3 pr-0">
        <Avatar
          image={user?.customInfo?.avatar}
          size="large"
          shape="circle"
          className="ml-auto "
        />
      </div>
      <div className="flex-grow-1 p-3 ">
        <InputTextarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={5}
          cols={30}
          className="surface-100"
        />
        <div className="flex justify-content-between ">
          <div className="">
            <FileUploader
              setFiles={setFiles}
              files={files}
            />
            {/* <FileUploader2
              setFiles={setFiles}
              files={files}
            /> */}

            {uploadButtons.map(({ icon, command }, index) =>
              icon !== "emoji-wink" ? (
                <Button
                  type="file"
                  key={`${index}-${icon}`}
                  icon={`bi bi-${icon}`}
                  rounded
                  text
                  onClick={command}
                />
              ) : (
                <>
                  <Button
                    type="button"
                    icon="bi bi-emoji-wink"
                    rounded
                    text
                    onClick={(e) => emojiRef.current.toggle(e)}
                  />
                  <OverlayPanel
                    ref={emojiRef}
                    showCloseIcon
                    pt={{
                      root: { className: "w-2" },
                    }}>
                    <div>
                      {emojis.map((emoji, i) => (
                        <span
                          className="text-2xl m-1"
                          onClick={() => {
                            emojiRef.current.toggle(false);
                            setValue((prev) => [prev.split(), emoji].join(" "));
                          }}>
                          {emoji}
                        </span>
                      ))}
                    </div>
                  </OverlayPanel>
                </>
              )
            )}
          </div>
          <Button
            label="Post"
            onClick={async () => {
              console.log("files: ", files);
              localStorage.setItem("testImage", JSON.stringify(files, null, 2));
              const postContent = { value, files };
              const response = await addPost(updateAppState, postContent, authToken);
              if (response === 201) {
                setValue("");
              }
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default CreatePost;
