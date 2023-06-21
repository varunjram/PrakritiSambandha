import React from "react";
import Layout from "../components/Layout";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useAppContext } from "../context/AppContext";

function HomeContents() {
  const { posts } = useAppContext();
  return (
    <div>
      <CreatePost />
      <h3>Latest Posts</h3>
      {posts?.map((post, i) => (
        <Post
          key={`${post?._id}`}
          post={post}
        />
      ))}
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
