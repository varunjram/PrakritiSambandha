import React from "react";
import Layout from "../components/Layout";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import Post from "../components/Post";

function ProfileContents() {
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
      value: "2K",
    },
    {
      stat: "Posts",
      value: "2",
    },
    {
      stat: "Following",
      value: "0",
    },
  ];

  return (
    <div className="text-center">
      <div className=" flex justify-content-center max-content-max ">
        <Avatar
          image="https://source.boringavatars.com/beam"
          className="w-7rem h-7rem"
        />
      </div>
      <h1 className="mt-0">Name</h1>
      <h3 className="text-500">@uniquewebtag</h3>
      <Button
        label="Edit Profile"
        outlined
        className="secondary"
      />
      <p className="text-500">
        {selfTags.map((tag, i) => (i !== selfTags.length - 1 ? ` ${tag} ||` : ` ${tag}`)).join("")}
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
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
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
