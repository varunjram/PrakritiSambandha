import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { useAppContext } from "../context/AppContext";
import { UPDATE_APP_STATE } from "../reducers/AppReducer";
import { getAllUserPosts } from "../services";
import { postFilterBy } from "../helperFunctions/index.js";
import { useAuthentication } from "../context/AuthContext";

function ProfileContents() {
  const { sortBy, userPosts, dispatch, users } = useAppContext();
  const { userName } = useParams();
  const [selectedUser, setSelectedUser] = useState(
    users.find((user) => user?.username === userName)
  );

  const Navigate = useNavigate();

  console.log("users: ", { users, userName });
  const {
    _id,
    firstName,
    lastName,
    username,
    password,
    createdAt,
    updatedAt,
    followers,
    following,
    bookmarks,
    id,
  } = selectedUser || {};

  !selectedUser && Navigate("/*");
  const selfTags = [
    "Senior Software Engineer @Microsoft",
    "Creator of India’s biggest programming community",
    " Tweets about JavaScript",
    "ReactJS",
    "Career and Startups",
  ];

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
  useEffect(() => {
    (async () => {
      await getAllUserPosts(userName, UpdateAppState);
    })();
    console.log("userName: ", userName);
  }, [userName]);

  return (
    <div className="text-center">
      <section className="user-details">
        <div className=" flex justify-content-center max-content-max ">
          <Avatar
            image="https://source.boringavatars.com/beam"
            className="w-7rem h-7rem"
          />
        </div>
        <h1 className="mt-0">{`${firstName}${lastName}`}</h1>
        <h3 className="text-500">@{username}</h3>
        <Button
          label="Edit Profile"
          outlined
          className="secondary"
        />
        <p className="text-500">
          {selfTags
            .map((tag, i) => (i !== selfTags.length - 1 ? ` ${tag} ||` : ` ${tag}`))
            .join("")}
        </p>
        <Link
          className="text-red-500"
          to={"https://www.factretriever.com/"}
          target="_blank">
          userWebsite.com
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
