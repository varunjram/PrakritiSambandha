import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { useAuthentication } from "../context/AuthContext";

function LeftSideContent() {
  const { user } = useAuthentication();
  console.log("user: ", user);

  const { firstName, lastName, customInfo, username } = user;
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
      path: "/profile",
    },
  ];
  return (
    <aside className="w-3 border-1 flex flex-column  justify-content-between ">
      <div className="mt-5">
        <div className="flex flex-column ml-auto min-w-min">
          {sideMenu.map(({ icon, name, path }) => (
            <Link
              key={`${name}-${icon}`}
              className="ml-7 mb-3 cursor-pointer"
              to={path}>
              <i className={`bi bi-${icon} mr-3`}></i>
              {name}
            </Link>
          ))}
        </div>
        <Button
          label="Create New Post"
          className="block ml-7"
        />
      </div>
      <article className="flex fixed bottom-0 mb-3 w-3 p-3">
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
