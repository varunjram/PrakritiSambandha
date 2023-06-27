import React, { useRef, useState } from "react";
import moment from "moment";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useAppContext } from "../context/AppContext";
import { UPDATE_APP_STATE } from "../reducers/AppReducer";
import {
  handleBookMark,
  handleLikeAndDislike,
  handlePostDelete,
  handlePostEdit,
} from "../services";
import { useAuthentication } from "../context/AuthContext";
import { UPDATE_BOOKMARKS } from "../reducers/AuthReducer";
import { Menu } from "primereact/menu";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";

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
  const postMenuRef = useRef();
  const [visible, setVisible] = useState(false);
  const [editContent, setEditContent] = useState("content");

  const updateAppState = (key, value) =>
    dispatch({ type: UPDATE_APP_STATE, payload: { key: key, value: value } });
  const updateBookmarks = (value) => authDispatch({ type: UPDATE_BOOKMARKS, payload: value });
  const isPostLiked = likedBy.some((likedUser) => likedUser._id === user._id);
  const isPostBookmarked = user?.bookmarks.some((bookmarkUser) => bookmarkUser._id === _id);
  const isLoggedInUsersPost = user?.username === post?.username;

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
  let postMenu = [
    {
      label: "Edit",
      icon: "bi bi-pencil",
      command: () => {
        setVisible(true);
        setEditContent(content);
      },
    },
    {
      label: "Delete",
      icon: "bi bi-trash",
      command: () => {
        if (isLoggedInUsersPost) {
          handlePostDelete(authToken, _id, updateAppState);
        } else {
          alert("this is not your post to delete");
        }
      },
    },
  ];
  const dialogFooterContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => {
          setVisible(false);
          setEditContent("");
        }}
        className="p-button-text"
      />
      <Button
        label="Update"
        icon="pi pi-check"
        onClick={() => {
          setVisible(false);
          if (isLoggedInUsersPost) {
            alert("will be edited");
            handlePostEdit(authToken, editContent, _id, updateAppState);
          }
          alert("will not be edited");
        }}
        autoFocus
      />
    </div>
  );

  return (
    <section className="flex surface-0 mb-4 relative">
      {/* <pre>{JSON.stringify(authToken, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <Dialog
        header="Edit Post"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        footer={dialogFooterContent}>
        <InputTextarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={5}
          cols={30}
          className="surface-100"
        />
      </Dialog>
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
      <Button
        icon="bi bi-three-dots-vertical"
        className="absolute top-0 right-0  "
        rounded
        text
        onClick={(event) => postMenuRef.current.toggle(event)}
        aria-controls="popup_menu_right"
        aria-haspopup
      />
      <Menu
        model={postMenu}
        popup
        ref={postMenuRef}
        id="popup_menu_right"
        popupAlignment="left"
      />
      {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
    </section>
  );
}

export default Post;
