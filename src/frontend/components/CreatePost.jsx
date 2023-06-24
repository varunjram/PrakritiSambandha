import React, { useState } from "react";
import { Avatar } from "primereact/avatar";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { addPost } from "../services";
import { useAppContext } from "../context/AppContext";
import { UPDATE_APP_STATE } from "../reducers/AppReducer";

const uploadButtons = [
  {
    icon: "image",
    command: () => {
      alert("a");
    },
  },
  {
    icon: "filetype-gif",
    command: () => {
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
  const { dispatch } = useAppContext();

  const updateAppState = (key, value) =>
    dispatch({ type: UPDATE_APP_STATE, payload: { key: key, value: value } });

  return (
    <section className="flex surface-0">
      <div className="p-3 pr-0">
        <Avatar
          image="https://source.boringavatars.com/beam"
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
          <div>
            {uploadButtons.map(({ icon, command }, index) => (
              <Button
                key={`${index}-${icon}`}
                icon={`bi bi-${icon}`}
                rounded
                text
                aria-label="Filter"
                onClick={command}
              />
            ))}
          </div>
          <Button
            label="Post"
            onClick={async () => {
              const response = await addPost(updateAppState, value);
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
