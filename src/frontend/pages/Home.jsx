import React from "react";
import Layout from "../components/Layout";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useAppContext } from "../context/AppContext";

function HomeContents() {
  const { posts, sortBy } = useAppContext();

  const postFilterBy = (sortBy) => {
    if (sortBy === "LATEST")
      return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const postToDisplay = postFilterBy(sortBy);

  return (
    <div>
      <CreatePost />
      <h3>Latest Posts</h3>
      {postToDisplay?.map((post, i) => (
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
