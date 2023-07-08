import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import CreateEditPost from "../components/CreateEditPost";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { useAppContext } from "../context/AppContext";
import { useAuthentication } from "../context/AuthContext";
import { postFilterBy } from "../helperFunctions";

function HomeContents() {
  const { user } = useAuthentication();
  const { posts, sortBy } = useAppContext();
  const toast = useRef(null);

  const postToDisplay = postFilterBy(sortBy, posts, user?.username);

  return (
    <div>
      <Toast ref={toast} />
      <CreateEditPost toast={toast} />
      <h3>Latest Posts</h3>
      {postToDisplay?.map((post, i) => (
        <Post
          key={`${post?._id}`}
          post={post}
          toast={toast}
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
