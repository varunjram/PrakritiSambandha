import React, { useRef } from "react";
import Layout from "../components/Layout";
import { useAuthentication } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";
import { postFilterBy } from "../helperFunctions";
import Post from "../components/Post";
import { Toast } from "primereact/toast";

function BookmarksContents() {
  const { user } = useAuthentication();
  const { posts, sortBy } = useAppContext();
  const toast = useRef();

  const userBookmarks = user?.bookmarks?.map((post) => post?._id);
  console.log("userBookmarks: ", userBookmarks);

  const postToDisplay = postFilterBy(
    sortBy,
    posts.filter((post) => userBookmarks.includes(post?._id))
  );
  console.log("postToDisplay: ", postToDisplay);
  return (
    <div>
      <Toast ref={toast} />

      <h1 className="mt-0">Your Bookmarks</h1>
      <div>
        {user?.bookmarks?.length ? (
          <div>
            {postToDisplay?.map((post, i) => (
              <Post
                key={`${post?._id}`}
                post={post}
                toast={toast}
              />
            ))}
          </div>
        ) : (
          <h1>Nothing to display</h1>
        )}
      </div>
    </div>
  );
}

function Bookmarks() {
  return (
    <Layout>
      <BookmarksContents />
    </Layout>
  );
}

export default Bookmarks;
