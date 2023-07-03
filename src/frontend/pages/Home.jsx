import React from "react";
import Layout from "../components/Layout";
import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import { useAppContext } from "../context/AppContext";
import { postFilterBy } from "../helperFunctions";
import { useAuthentication } from "../context/AuthContext";

function HomeContents() {
  const { user } = useAuthentication();
  const { posts, sortBy } = useAppContext();

  const postToDisplay = postFilterBy(sortBy, posts, user?.username);

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
