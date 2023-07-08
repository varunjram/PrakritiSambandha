import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { useAppContext } from "../context/AppContext";
import { UPDATE_FOLLOW_USER, UPDATE_SORTBY_METHOD } from "../reducers/AppReducer";
import { postFollowHandler } from "../services";
import { useAuthentication } from "../context/AuthContext";
import { UPDATE_AUTH_STATE } from "../reducers/AuthReducer";
import SearchUsers from "./SearchUsers";

function RightSideContent() {
  const { users, dispatch, sortBy } = useAppContext();
  const { authToken, dispatch: authDispatch, user: currentUser } = useAuthentication();

  console.log("users: ", users);
  const Navigate = useNavigate();

  const isCurrentSortBy = (sortBy, button) => {
    return sortBy === button ? true : false;
  };
  const UpdateAppUsers = (data) => dispatch({ type: UPDATE_FOLLOW_USER, payload: data });

  const UpdateAuthUser = (data) =>
    authDispatch({ type: UPDATE_AUTH_STATE, payload: { key: "user", value: data } });

  const followingUserIds = currentUser?.following?.map(({ _id }) => _id);
  const usersToFollow = users?.filter(
    (user) => ![...followingUserIds, currentUser?._id].includes(user?._id)
  );
  console.log("usersToFollow: ", { usersToFollow, follow: followingUserIds });

  const sortByMenus = [
    { label: "Latest", method: "LATEST", icon: "calendar-event-fill" },
    { label: "Trending", method: "TRENDING", icon: "fire" },
  ];
  return (
    <aside className="w-3 border-1 flex flex-column align-items-center pt-5  ">
      <SearchUsers />
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
        {usersToFollow?.map((user, index) => {
          const { _id, lastName, firstName, username, customInfo } = user;
          return (
            <div
              className="flex  bottom-0 m-1 align-items-center cursor-pointer"
              key={`${index}${user}`}>
              <Avatar
                image={customInfo?.avatar}
                size="small"
                shape="circle"
                className="ml-auto mr-2 "
              />
              <div
                className="flex-grow-1 "
                onClick={() => {
                  Navigate(`/profile/${username}/${_id}`);
                }}>
                <h3 className="m-0">{`${firstName} ${lastName}`}</h3>
                <p className="text-500 m-0">@{username}</p>
              </div>

              <p className="text-red-700"></p>
              <Button
                label="Follow +"
                text
                className="secondary"
                onClick={async () => {
                  await postFollowHandler("follow", authToken, _id, UpdateAuthUser, UpdateAppUsers);
                }}
              />
            </div>
          );
        })}
        ,
      </article>
    </aside>
  );
}

export default RightSideContent;
