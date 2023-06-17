import React from "react";
import Layout from "../components/Layout";
import CreatePost from "../components/CreatePost";

function HomeContents() {
  return (
    <div>
      <CreatePost />
      <h3>Latest Posts</h3>
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
