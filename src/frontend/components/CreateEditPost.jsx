import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { OverlayPanel } from "primereact/overlaypanel";
import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useAuthentication } from "../context/AuthContext";
import { UPDATE_APP_STATE } from "../reducers/AppReducer";
import { addPost, handlePostEdit } from "../services";
import emojis from "../utils/emoji";
import FileUploader from "./FileUploader";
import axios from "axios";
import FullScreenLoader from "./FullScreenLoader";
// import FileUploader2 from "./FileUploader2";

function CreateEditPost({ setVisible, toast, editPost = null, setEditDialogVisibility }) {
  const [postTextBody, setPostTextBody] = useState("");
  const [files, setFiles] = useState([]);
  const { dispatch } = useAppContext();
  const { authToken, user } = useAuthentication();
  const [loading, setLoading] = useState(false);
  const emojiRef = useRef(null);
  console.log("files: ", files);

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
        const preset = process.env.REACT_APP_CLOUDINARY_PRESET;
        const cloud = process.env.REACT_APP_CLOUDINARY_NAME;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", preset);
        console.log("data: ", JSON.stringify(data, null, 2));
        try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
            method: "POST",
            body: data,
          });
          const file = await res.json();
          console.log("file.secure_url: ", file.secure_url);
        } catch (error) {
          console.log("error:imageupload ", error);
        }
      },
    },
    {
      icon: "emoji-wink",
      command: () => {
        alert("c");
      },
    },
  ];

  const { content, _id } = editPost || {};

  const updateAppState = (key, value) =>
    dispatch({ type: UPDATE_APP_STATE, payload: { key: key, value: value } });

  useEffect(() => {
    if (editPost) {
      setPostTextBody(content);
    }
  }, []);

  return (
    <>
      {loading && <FullScreenLoader />}
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
            value={postTextBody}
            onChange={(e) => setPostTextBody(e.target.value)}
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
                              setPostTextBody((prev) => [prev.split(), emoji].join(" "));
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
              label={editPost ? "Update" : "Post"}
              onClick={async () => {
                setLoading(true);
                if (!editPost) {
                  if (!postTextBody.trim()) {
                    toast.current.show({
                      severity: "error",
                      summary: "Can not Create Empty post",
                      detail: "Add some content to create a Post",
                    });
                    return;
                  }
                  const postContent = { postTextBody, files };
                  const response = await addPost(updateAppState, postContent, authToken, files);
                  if (response === 201) {
                    setLoading(false);
                    toast.current.show({
                      severity: "success",
                      summary: "Post Created",
                    });
                    setPostTextBody("");
                    setVisible && setVisible(false);
                  } else {
                    setLoading(false);
                  }
                } else {
                  const { status } = await handlePostEdit(
                    authToken,
                    postTextBody,
                    _id,
                    updateAppState
                  );
                  if (status === 201) {
                    toast.current.show({
                      severity: "success",
                      summary: "Successfully edited Post",
                    });
                    setEditDialogVisibility(false);
                  } else {
                    toast.current.show({
                      severity: "error",
                      summary: "Could not edit Post",
                    });
                  }
                }
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateEditPost;
