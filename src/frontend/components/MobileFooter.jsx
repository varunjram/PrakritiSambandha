import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthContext";
import CreateEditPost from "./CreateEditPost";

const MobileFooter = () => {
  const { user } = useAuthentication();
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const sideMenu = [
    {
      icon: "house",
      name: "Home",
      command: () => Navigate("/"),
    },
    {
      icon: "rocket",
      name: "Explore",
      command: () => Navigate("/explore"),
    },
    {
      icon: "plus",
      name: "Explore",
      command: () => setVisible(true),
    },
    {
      icon: "bookmark",
      name: "Bookmark",

      command: () => Navigate("/bookmark"),
    },
    {
      icon: "person",
      name: "Profile",
      command: () => Navigate(`/profile/${user?.username}/${user?._id}`),
    },
  ];

  const Navigate = useNavigate();
  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Create New Post"
        visible={visible}
        className="w-full  lg:w-6 "
        onHide={() => setVisible(false)}>
        <CreateEditPost
          setVisible={setVisible}
          toast={toast}
        />
      </Dialog>
      <div
        className=" flex justify-content-around fixed w-full  bottom-0  z-5 text-white  md:hidden   "
        style={{ backgroundColor: "#483C32" }}>
        {sideMenu.map(({ icon, name, command }) => (
          <Button
            icon={`bi bi-${icon}`}
            text
            className="text-3xl p-0"
            onClick={command}
          />
        ))}
      </div>
    </>
  );
};

export default MobileFooter;
