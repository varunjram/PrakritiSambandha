import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

function LeftSideContent() {
  const sideMenu = [
    {
      icon: "house",
      name: "Home",
      path: "/home",
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
    <aside className="w-3 border-1 ">
      <div className="flex flex-column ml-auto min-w-min">
        {sideMenu.map(({ icon, name, path }) => (
          <Link
            className="ml-7 mb-2 cursor-pointer"
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
    </aside>
  );
}

export default LeftSideContent;
