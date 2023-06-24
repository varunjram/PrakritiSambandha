import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { useAppContext } from "../context/AppContext";
import { UPDATE_SORTBY_METHOD } from "../reducers/AppReducer";

function RightSideContent() {
  const { users, dispatch, sortBy } = useAppContext();
  console.log("users: ", users);
 

  const isCurrentSortBy = (sortBy, button) => {
    return sortBy === button ? true : false;
  };

  const sortByMenus = [
    { label: "Latest", method: "LATEST", icon: "calendar-event-fill" },
    { label: "Trending", method: "TRENDING", icon: "fire" },
  ];
  return (
    <aside className="w-3 border-1 flex flex-column align-items-center pt-5  ">
      <span className="p-input-icon-left ">
        <i className="pi pi-search" />
        <InputText placeholder="Search" />
      </span>
      <div className="mt-2">
        {sortByMenus.map(({ method, label, icon }) => (
          <Button
            label={label}
            text={isCurrentSortBy(sortBy, method)}
            raised={isCurrentSortBy(sortBy, method)}
            icon={`bi bi-${icon}`}
            className="mr-2"
            onClick={() => dispatch({ type: UPDATE_SORTBY_METHOD, payload: method })}
          />
        ))}
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
