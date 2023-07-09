import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import Post from "../components/Post";
import { useAppContext } from "../context/AppContext";
import { useAuthentication } from "../context/AuthContext";
import { postFilterBy } from "../helperFunctions/index.js";
import { UPDATE_APP_STATE, UPDATE_FOLLOW_USER } from "../reducers/AppReducer";
import { UPDATE_AUTH_STATE } from "../reducers/AuthReducer";
import { EditUser, getAllUserPosts, getAllUsers, getUser } from "../services";
import { postFollowHandler } from "../services/postServices";

function ProfileContents() {
  const { sortBy, userPosts, dispatch, avatarOptions, posts } = useAppContext();
  const { authToken, dispatch: authDispatch, user } = useAuthentication();

  const {
    user: { username: loggedInUser },
  } = useAuthentication();
  const { userName, userId } = useParams();
  const [selectedUser, setSelectedUser] = useState();
  const [updateUsers, setUpdateUsers] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    userTags: [],
    userPortFolio: "",
    userBio: "",
  });

  const toast = useRef();

  const avatarOptionsForm = avatarOptions.map((ele, i) => ({
    img: ele,
    name: `Avatar ${i + 1}`,
    key: `${i + 1}`,
  }));
  const [selectedAvatar, setSelectedAvatar] = useState({});

  const { _id, firstName, lastName, username, followers, following, customInfo } =
    selectedUser || {};

  const isFollowedUser = user?.following?.some((follower) => follower?._id === _id);

  const isProfileOfLoggedInUser = loggedInUser === userName;
  // !selectedUser && Navigate("/*");

  const userStats = [
    {
      stat: "Followers",
      value: followers?.length,
    },
    {
      stat: "Posts",
      value: userPosts?.length,
    },
    {
      stat: "Following",
      value: following?.length,
    },
  ];

  const postToShow = postFilterBy(sortBy, userPosts);

  const UpdateAppState = (key, data) =>
    dispatch({ type: UPDATE_APP_STATE, payload: { key: key, value: data } });

  const UpdateAppUsers = (data) => dispatch({ type: UPDATE_FOLLOW_USER, payload: data });

  const UpdateAuthUser = (data) =>
    authDispatch({ type: UPDATE_AUTH_STATE, payload: { key: "user", value: data } });

  const handleEditFormChange = (event) =>
    setEditForm((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  useEffect(() => {
    (async () => {
      await getAllUserPosts(userName, UpdateAppState);
    })();
  }, [userName, posts]);

  useEffect(() => {
    (async () => {
      const userResponse = await getUser(userId);

      setSelectedUser(userResponse);
    })();
  }, [userId]);

  useEffect(() => {
    if (updateUsers) {
      const updateAppState = (key, value) =>
        dispatch({ type: UPDATE_APP_STATE, payload: { key: key, value: value } });
      getAllUsers(updateAppState);
    }
  }, [updateUsers]);
  return (
    <div className="text-center">
      <Toast ref={toast} />
      <Dialog
        header="Edit Profile"
        visible={editProfile}
        className="w-full md:w-10 lg:w-6"
        onHide={() => setEditProfile(false)}>
        <div className="relative">
          {
            <div className="card flex justify-content-center relative">
              <div className="flex flex-wrap  grid">
                {avatarOptionsForm?.map((avatarObj, i) => {
                  return (
                    <div className="col-4 md:col-6 ">
                      <Avatar
                        image={avatarObj.img}
                        // className="w-7rem h-7rem"s
                        className={`${
                          i % 2 ? "md:ml-auto" : null
                        } w-2rem h-2rem md:w-4rem md:h-4rem block`}
                      />
                      <div
                        key={avatarObj.key}
                        className="flex align-items-center">
                        <RadioButton
                          inputId={avatarObj.key}
                          name="avatarObj"
                          value={avatarObj}
                          onChange={(e) => setSelectedAvatar(e.value)}
                          checked={selectedAvatar?.key === avatarObj?.key}
                          className={`${i % 2 ? "md:ml-auto" : null}`}
                        />
                        <label
                          htmlFor={avatarObj.key}
                          className="ml-2">
                          {avatarObj.name}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          }
          <div
            className="md:absolute top-0  grid justify-content-center align-items-center text-center m-auto w-9 ml-12rem"
            style={{ left: "13%" }}>
            <div className="col-12">
              <Avatar
                image={selectedAvatar?.img}
                className="w-7rem h-7rem flex-1"
              />
            </div>
            <div className="flex flex-column gap-2 col-8">
              <label htmlFor="username">Bio</label>
              <InputTextarea
                id="userBio"
                value={editForm.userBio}
                className="h-7rem"
                cols={35}
                onChange={handleEditFormChange}
              />
            </div>
            <div className="flex flex-column gap-2 col-8">
              <label htmlFor="username">Portfoil URL</label>
              <InputText
                value={editForm.userPortFolio}
                id="userPortFolio"
                className=""
                onChange={handleEditFormChange}
              />
            </div>
            <div className="col-12">
              <Button
                label="Update"
                onClick={async () => {
                  const EditData = {
                    customInfo: {
                      ...customInfo,
                      bio: editForm?.userBio,
                      portfolioUrl: editForm?.userPortFolio,
                      avatar: selectedAvatar.img,
                    },
                  };
                  const { user, status } = await EditUser(authToken, EditData, UpdateAuthUser);

                  if (status === 201) {
                    setSelectedUser(user);
                    setEditProfile(false);
                    setUpdateUsers(true);
                  }
                }}
                className="col-3"
              />
            </div>
          </div>
        </div>
      </Dialog>

      {selectedUser && (
        <section className="user-details">
          <div className=" flex justify-content-center max-content-max ">
            <Avatar
              image={customInfo?.avatar}
              className="w-7rem h-7rem"
            />
          </div>
          <h1 className="mt-0">{`${firstName} ${lastName}`}</h1>
          <h3 className="text-500">@{username}</h3>
          {isProfileOfLoggedInUser ? (
            <Button
              label="Edit Profile"
              outlined
              className="secondary"
              onClick={() => {
                setEditProfile(true);

                setEditForm({
                  userTags: customInfo?.tags,
                  userPortFolio: customInfo?.portfolioUrl,
                  userBio: customInfo?.bio,
                });
                setSelectedAvatar(
                  avatarOptionsForm.find((avatarObj) => avatarObj?.img === customInfo?.avatar)
                );
                //   );
              }}
            />
          ) : (
            <Button
              label={isFollowedUser ? "Un-follow" : "Follow"}
              className="secondary"
              onClick={async () => {
                const type = isFollowedUser ? "unfollow" : "follow";
                await postFollowHandler(
                  type,
                  authToken,
                  selectedUser?._id,
                  UpdateAuthUser,
                  UpdateAppUsers
                );
              }}
            />
          )}
          <p className="text-500">
            {customInfo?.tags
              .map((tag, i) => (i !== customInfo?.tags.length - 1 ? ` ${tag} ||` : ` ${tag}`))
              .join("")}
          </p>
          <p className="text-primary">{customInfo?.bio}</p>
          <Link
            className="text-red-500"
            to={customInfo?.portfolioUrl}
            target="_blank">
            {customInfo?.portfolioUrl}
          </Link>
          <div className="flex justify-content-center mb-3">
            {userStats.map(({ stat, value }) => (
              <div className="pl-5 pr-5">
                <p className="mb-0">
                  <strong>{value}</strong>
                </p>
                <p className="mb-0 mt-1">{stat}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {!selectedUser && <LoadingSpinner />}
      <section className="user-posts">
        {postToShow?.map((post) => (
          <Post
            post={post}
            key={`${post?._id}-${post?.username}`}
            toast={toast}
          />
        ))}
      </section>
    </div>
  );
}

function Profile() {
  return (
    <Layout>
      <ProfileContents />
    </Layout>
  );
}

export default Profile;
