import moment from "moment";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Menu } from "primereact/menu";
import React, { useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useAuthentication } from "../context/AuthContext";
import { UPDATE_APP_STATE } from "../reducers/AppReducer";
import { UPDATE_BOOKMARKS } from "../reducers/AuthReducer";
import { handleBookMark, handleLikeAndDislike, handlePostDelete } from "../services";
import CreateEditPost from "./CreateEditPost";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import FullScreenLoader from "./FullScreenLoader";

const findUser = (username, users) => {
  return users?.find((user) => user?.username === username) || {};
};
function Post({ post, toast }) {
  const { users, dispatch } = useAppContext();
  const { authToken, user, dispatch: authDispatch } = useAuthentication();
  const Navigate = useNavigate();

  const { _id, content, username, createdAt, likes, image } = post || {};
  const { likeCount = 0, likedBy = null } = likes || {};
  const postMenuRef = useRef();
  const [visible, setVisible] = useState(false);
  const postedUser = findUser(username, users);
  const { lastName, firstName, customInfo, _id: userId } = postedUser;

  const updateAppState = (key, value) =>
    dispatch({ type: UPDATE_APP_STATE, payload: { key: key, value: value } });
  const updateBookmarks = (value) => authDispatch({ type: UPDATE_BOOKMARKS, payload: value });
  const isPostLiked = likedBy?.some((likedUser) => likedUser?._id === user?._id);

  const isPostBookmarked = user?.bookmarks?.some((bookmarkUser) => bookmarkUser?._id === _id);
  const isLoggedInUsersPost = user?.username === post?.username;

  const postButtons = [
    {
      icon: isPostLiked ? "heart-fill" : "heart",
      command: async () => {
        const type = isPostLiked ? "dislike" : "like";
        const likeResponse = await handleLikeAndDislike(type, authToken, _id, updateAppState);

        if (likeResponse?.status === 201) {
          type === "like"
            ? toast.current.show({
                severity: "success",
                summary: "Post Liked",
              })
            : toast.current.show({
                severity: "info",
                summary: "Post Disliked",
              });
        }
      },
    },
    // {
    //   icon: "chat-left",
    //   command: () => {
    //     alert("b");
    //   },
    // },
    {
      icon: "share",
      command: async () => {
        const host = "http://localhost:3000";
        navigator.clipboard.writeText(`${host}/post/${_id}`);
        toast.current.show({
          severity: "info",
          summary: "Link Copied",
          detail: "You can Start sharing the link copied",
        });
      },
    },
    {
      icon: isPostBookmarked ? "bookmark-fill" : "bookmark",
      command: async () => {
        const type = isPostBookmarked ? "remove-bookmark" : "bookmark";
        const responseStatus = await handleBookMark(type, authToken, _id, updateBookmarks);

        if (responseStatus?.status === 200) {
          type === "bookmark"
            ? toast.current.show({
                severity: "success",
                summary: "Post Bookmarked",
              })
            : toast.current.show({
                severity: "info",
                summary: "Removed Bookmark",
              });
        }
      },
    },
  ];
  let postMenu = [
    {
      label: "Edit",
      icon: "bi bi-pencil",
      disabled: isLoggedInUsersPost ? false : true,
      command: () => {
        setVisible(true);
      },
    },
    {
      label: "Delete",
      icon: "bi bi-trash",
      command: async () => {
        const { status } = await handlePostDelete(authToken, _id, updateAppState);
        if (status === 201) {
          toast.current.show({
            severity: "success",
            summary: "Successfully Deleted",
          });
        }
      },
    },
  ];

  const navigateToPerson = () => Navigate(`/profile/${username}/${userId}`);
  return (
    <>
      <section className="flex surface-0 mb-4 relative text-left">
        <Dialog
          header="Edit Post"
          visible={visible}
          className="w-full md:w-10 lg:w-6"
          onHide={() => setVisible(false)}>
          <CreateEditPost
            toast={toast}
            editPost={post}
            setEditDialogVisibility={setVisible}
          />
        </Dialog>
        <div
          className="p-1 md:p-3 pr-0 cursor-pointer  "
          onClick={navigateToPerson}>
          <Avatar
            image={customInfo?.avatar}
            size="large"
            shape="circle"
            className="ml-auto"
          />
        </div>
        <div className="p-2 md:flex-grow-1 md:p-3 ">
          <div
            className="mb-1 md:flex align-items-center cursor-pointer mb-3"
            onClick={navigateToPerson}>
            <h4 className="m-1 mr-2 ">{`${firstName} ${lastName}`}</h4>
            <span className="text-500">
              @{username} &#8729; {moment(createdAt).format("MMMM Do YYYY, h:mm a")}
            </span>
          </div>
          <div
            className="white-space-pre-wrap cursor-pointer md:text-lg "
            onClick={() => Navigate(`/post/${_id}`)}>
            {content}
          </div>
          {image && (
            <div className="w-full">
              <img
                src={image}
                alt=""
                className="w-full -full"
              />
            </div>
          )}
          <div className="flex justify-content-between mt-2 ">
            {postButtons.map(({ icon, command, activeIcon }, index) => (
              <Button
                key={`${index}-${icon}`}
                icon={`bi bi-${icon}`}
                rounded
                text
                aria-label="Filter"
                onClick={command}
                badge={icon.includes("heart") && likeCount}
                badgeClassName="absolute top-0 right-0 "
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
          disabled={isLoggedInUsersPost ? false : true}
        />
        <Menu
          model={postMenu}
          popup
          ref={postMenuRef}
          id="popup_menu_right"
          popupAlignment="left"
        />
      </section>
    </>
  );
}

export default Post;
