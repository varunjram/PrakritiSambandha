import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthContext";
import CreatePost from "./CreateEditPost";

function LeftSideContent() {
  const { user } = useAuthentication();
  console.log("user: ", user);
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const Navigate = useNavigate();

  const { firstName, lastName, customInfo, username } = user || {};
  const sideMenu = [
    {
      icon: "house",
      name: "Home",
      path: "/",
    },
    {
      icon: "rocket",
      name: "Explore",
      path: "/explore",
    },
    {
      icon: "bookmark",
      name: "Bookmark",
      path: "/bookmark",
    },
    {
      icon: "person",
      name: "Profile",
      path: `/profile/${user?.username}/${user?._id}`,
    },
  ];
  return (
    <aside className="hidden md: border-1 md:flex flex-column justify-content-between md:w-auto lg:w-3 ">
      <Toast ref={toast} />
      <Dialog
        header="Create New Post"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}>
        <CreatePost
          setVisible={setVisible}
          toast={toast}
        />
      </Dialog>
      <div className="mt-5 md:mx-2 lg:ml-0">
        <div className="flex flex-column ml-auto min-w-min">
          {sideMenu.map(({ icon, name, path }) => (
            <Link
              key={`${name}-${icon}`}
              className="lg:ml-7 mb-3 cursor-pointer text-xl"
              to={path}>
              <i className={`bi bi-${icon} mr-3`}></i>
              {name}
            </Link>
          ))}
        </div>
        <Button
          label="Create New Post"
          className="lg:ml-7"
          onClick={() => setVisible(true)}
        />
      </div>
      <article
        className="hidden lg:flex fixed bottom-0 mb-3 w-3 p-3 cursor-pointer"
        onClick={() => Navigate(`/profile/${user?.username}/${user?._id}`)}>
        <Avatar
          image={customInfo?.avatar}
          size="small"
          shape="circle"
          className="ml-auto mr-2 "
        />
        <div className="flex-grow-1 relative">
          <h3 className="m-0">{`${firstName} ${lastName}`}</h3>
          <p className="text-500 m-0">@{username}</p>
          <span className="absolute top-0 right-0">...</span>
        </div>
      </article>
    </aside>
  );
}

export default LeftSideContent;
