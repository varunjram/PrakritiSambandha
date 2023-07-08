import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Post from "../components/Post";
import Layout from "../components/Layout";
import { Toast } from "primereact/toast";

export const SinglePostContents = () => {
  const { postId } = useParams();
  const { posts } = useAppContext();
  const toast = useRef();

  const postToShow = posts?.find((post) => post?._id === postId);

  return (
    <div>
      <Toast ref={toast} />
      <Post
        post={postToShow}
        toast={toast}
      />
    </div>
  );
};

const SinglePost = () => {
  return (
    <Layout>
      <SinglePostContents />
    </Layout>
  );
};

export default SinglePost;
