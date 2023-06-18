import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";

function RightSideContent() {
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
    <aside className="w-3 border-1 flex flex-column align-items-center pt-5  ">
      <span className="p-input-icon-left ">
        <i className="pi pi-search" />
        <InputText placeholder="Search" />
      </span>

      <article className="p-3 align-self-stretch">
        <div className="flex justify-content-between border-bottom-2">
          <p className="mb-1">Who to Follow?</p>
          <p className="mb-1">Show More</p>
        </div>
        {[1, 2, 3, 4, 5].map((user) => (
          <div className="flex  bottom-0 m-1 align-items-center">
            <Avatar
              image="https://source.boringavatars.com/beam"
              size="small"
              shape="circle"
              className="ml-auto mr-2 "
            />
            <div className="flex-grow-1 ">
              <h3 className="m-0">Prakriti</h3>
              <p className="text-500 m-0">@prakritisambandha</p>
            </div>

            <p className="text-red-700">Follow +</p>
          </div>
        ))}
        ,
      </article>
    </aside>
  );
}

export default RightSideContent;
