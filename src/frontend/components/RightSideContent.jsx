import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { useAppContext } from "../context/AppContext";
import { LATEST_POSTS } from "../reducers/AppReducer";

function RightSideContent() {
  const { users, dispatch } = useAppContext();
  console.log("users: ", users);
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
      <div className="mt-2">
        <Button
          label="Latest"
          icon="bi bi-calendar-event-fill"
          className="mr-2"
          onClick={() => dispatch({ type: LATEST_POSTS })}
        />
        <Button
          label="Trending"
          icon="bi bi-fire"
          className="ml-2"
          onClick={() => {}}
        />
      </div>

      <article className="p-3 align-self-stretch">
        <div className="flex justify-content-between border-bottom-2">
          <p className="mb-1">Who to Follow?</p>
          <p className="mb-1">Show More</p>
        </div>
        {users.map((user, index) => {
          const { lastName, firstName, username } = user;
          return (
            <div
              className="flex  bottom-0 m-1 align-items-center"
              key={`${index}${user}`}>
              <Avatar
                image="https://source.boringavatars.com/beam"
                size="small"
                shape="circle"
                className="ml-auto mr-2 "
              />
              <div className="flex-grow-1 ">
                <h3 className="m-0">{`${firstName} ${lastName}`}</h3>
                <p className="text-500 m-0">@{username}</p>
              </div>

              <p className="text-red-700">Follow +</p>
            </div>
          );
        })}
        ,
      </article>
    </aside>
  );
}

export default RightSideContent;
