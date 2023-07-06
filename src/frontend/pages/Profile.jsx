import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { useAppContext } from "../context/AppContext";
import { UPDATE_APP_STATE, UPDATE_FOLLOW_USER } from "../reducers/AppReducer";
import { EditUser, getAllUserPosts, getUser } from "../services";
import { postFilterBy } from "../helperFunctions/index.js";
import { useAuthentication } from "../context/AuthContext";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Chips } from "primereact/chips";
import { UPDATE_AUTH_STATE } from "../reducers/AuthReducer";
import { postFollowHandler } from "../services/postServices";

function ProfileContents() {
  const { sortBy, userPosts, dispatch, users, avatarOptions } = useAppContext();
  const { authToken, dispatch: authDispatch, user } = useAuthentication();

  const {
    user: { username: loggedInUser },
  } = useAuthentication();
  const { userName } = useParams();
  const [selectedUser, setSelectedUser] = useState();
  const [editProfile, setEditProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    userTags: [],
    userPortFolio: "",
    userBio: "",
  });

  const avatarOptionsForm = avatarOptions.map((ele, i) => ({
    img: ele,
    name: `Avatar ${i + 1}`,
    key: `${i + 1}`,
  }));
  const [selectedAvatar, setSelectedAvatar] = useState({});

  const Navigate = useNavigate();

  const {
    _id,
    firstName,
    lastName,
    username,
    followers,
    following,

    customInfo,
  } = selectedUser || {};

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
  }, [userName]);

  useEffect(() => {
    // console.log("userName === loggedInUser?.username: ", userName === loggedInUser?.username);
    // if (userName === loggedInUser?.username) {
    //   console.log("loggedInUser:true ", loggedInUser);
    //   setSelectedUser(loggedInUser);
    // } else {
    //   setSelectedUser(users.find((user) => user?.username === userName));
    //
    // }
    (async () => {
      const userResponse = await getUser("501");
      console.log("userResponse: ", userResponse);
      setSelectedUser(userResponse);
    })();
  }, []);

  // const ProfileEditForm = () => {};

  return (
    <div className="text-center">
      <Dialog
        header="Edit Profile"
        visible={editProfile}
        style={{ width: "50vw" }}
        onHide={() => setEditProfile(false)}
        // footer={dialogFooterContent}
      >
        <div className="relative">
          {
            <div className="card flex justify-content-center relative">
              <div className="flex flex-wrap  grid">
                {avatarOptionsForm?.map((avatarObj, i) => {
                  return (
                    <div className="col-6">
                      <Avatar
                        image={avatarObj.img}
                        // className="w-7rem h-7rem"s
                        className={`${i % 2 ? "ml-auto" : null} w-4rem h-4rem block`}
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
                          className={`${i % 2 ? "ml-auto" : null}`}
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
            style={{ marginLeft: "25%", marginRight: "25%" }}
            className="absolute top-0 flex flex-column justify-content-center  align-items-center text-center ">
            <Avatar
              image={selectedAvatar?.img}
              className="w-7rem h-7rem flex-1"
            />
            {/* <p className="w-full flex-1">Selected Avatar</p> */}
            <div className="flex flex-column gap-2">
              <label htmlFor="username">Bio</label>
              <InputTextarea
                id="userBio"
                value={editForm.userBio}
                className="h-7rem"
                cols={35}
                onChange={handleEditFormChange}
              />
            </div>
            <div className="flex flex-column gap-2">
              <label htmlFor="username">Portfoil URL</label>
              <InputText
                value={editForm.userPortFolio}
                id="userPortFolio"
                className="w-22rem"
                onChange={handleEditFormChange}
              />
            </div>

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
                console.log("statusedit: ", status);
                if (status === 201) {
                  setSelectedUser(user);
                  setEditProfile(false);
                }
              }}
              className="block absolute bottom-0 right-0"
            />
          </div>
          {/* <pre>{JSON.stringify(selectedUser, null, 2)}</pre> */}
        </div>
      </Dialog>
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
          to={"https://www.factretriever.com/"}
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
      <section className="user-posts">
        {postToShow?.map((post) => (
          <Post
            post={post}
            key={`${post?._id}-${post?.username}`}
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
