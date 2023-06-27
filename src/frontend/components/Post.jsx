import React from "react";
import moment from "moment";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useAppContext } from "../context/AppContext";
import { UPDATE_APP_STATE } from "../reducers/AppReducer";
import { handleBookMark, handleLikeAndDislike } from "../services";
import { useAuthentication } from "../context/AuthContext";
import { UPDATE_BOOKMARKS } from "../reducers/AuthReducer";

const findUser = (username, users) => {
  const { firstName, lastName } = users?.find((user) => user?.username === username) || {};
  return `${firstName} ${lastName}`;
};
function Post({ post }) {
  const { users, dispatch } = useAppContext();
  const { authToken, user, dispatch: authDispatch } = useAuthentication();
  const {
    _id,
    content,
    username,
    createdAt,
    likes: { likedBy },
  } = post;

  const updateAppState = (key, value) =>
    dispatch({ type: UPDATE_APP_STATE, payload: { key: key, value: value } });
  const updateBookmarks = (value) => authDispatch({ type: UPDATE_BOOKMARKS, payload: value });
  const isPostLiked = likedBy.some((likedUser) => likedUser._id === user._id);
  const isPostBookmarked = user.bookmarks.some((bookmarkUser) => bookmarkUser._id === _id);

  const postButtons = [
    {
      icon: isPostLiked ? "heart-fill" : "heart",
      command: () => {
        const type = isPostLiked ? "dislike" : "like";
        handleLikeAndDislike(type, authToken, _id, updateAppState);
      },
    },
    {
      icon: "chat-left",
      command: () => {
        alert("b");
      },
    },
    {
      icon: "share",
      command: () => {
        alert("c");
      },
    },
    {
      icon: isPostBookmarked ? "bookmark-fill" : "bookmark",
      command: () => {
        const type = isPostBookmarked ? "remove-bookmark" : "bookmark";
        handleBookMark(type, authToken, _id, updateBookmarks);
      },
    },
  ];

  return (
    <section className="flex surface-0 mb-4">
      {/* <pre>{JSON.stringify(user.bookmarks, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <div className="p-3 pr-0">
        <Avatar
          image="https://source.boringavatars.com/beam"
          size="large"
          shape="circle"
          className="ml-auto "
        />
      </div>
      <div className="flex-grow-1 p-3 ">
        <div className="flex align-items-center ">
          <h4 className="mr-2">{findUser(username, users)}</h4>
          <span className="text-500">
            @{username} &#8729; {moment(createdAt).format("MMMM Do YYYY, h:mm a")}
          </span>
        </div>
        <div className="white-space-pre-wrap">{content}</div>
        <div className="flex justify-content-between mt-2 ">
          {postButtons.map(({ icon, command, activeIcon }, index) => (
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
      </div>
    </section>
  );
}

export default Post;
