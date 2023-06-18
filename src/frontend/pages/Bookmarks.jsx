import React from "react";
import Layout from "../components/Layout";

function BookmarksContents() {
  return (
    <div>
      <h1 className="mt-0">Your Bookmarks</h1>
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
