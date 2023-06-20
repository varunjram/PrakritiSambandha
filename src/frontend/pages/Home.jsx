import React from "react";
import Layout from "../components/Layout";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useAppContext } from "../context/AppContext";

function HomeContents() {
  const { users } = useAppContext();
  console.log("users: ", users);
  return (
    <div>
      <CreatePost />
      <h3>Latest Posts</h3>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

function Home() {
  return (
    <Layout>
      <HomeContents />
    </Layout>
  );
}

export default Home;
