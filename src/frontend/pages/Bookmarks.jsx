import React from "react";
import Layout from "../components/Layout";
import { useAuthentication } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";
import { postFilterBy } from "../helperFunctions";
import Post from "../components/Post";

function BookmarksContents() {
  const { user } = useAuthentication();
  const { posts, sortBy } = useAppContext();

  const userBookmarks = user?.bookmarks?.map((post) => post?._id);
  console.log("userBookmarks: ", userBookmarks);

  const postToDisplay = postFilterBy(
    sortBy,
    posts.filter((post) => userBookmarks.includes(post?._id))
  );
  console.log("postToDisplay: ", postToDisplay);
  return (
    <div>
      <h1 className="mt-0">Your Bookmarks</h1>
      {/* <pre>{JSON.stringify(user?.bookmarks, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(postToDisplay, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify({ test: "test" }, null, 2)}</pre> */}
      <div>
        {user?.bookmarks?.length ? (
          <div>
            {postToDisplay?.map((post, i) => (
              <Post
                key={`${post?._id}`}
                post={post}
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
