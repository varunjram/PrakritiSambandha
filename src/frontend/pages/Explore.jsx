import React from "react";
import Layout from "../components/Layout";
import { Button } from "primereact/button";
import Post from "../components/Post";

function ExploreContents() {
  const filterButtons = [
    {
      filterBy: "Plants",
    },
    {
      filterBy: "Trees",
    },
    {
      filterBy: "Gardening",
    },
    {
      filterBy: "Organic",
    },
    {
      filterBy: "Pots",
    },
    {
      filterBy: "Plants",
    },
  ];
  return (
    <div>
      <h1 className="mt-0">Explore</h1>
      <div className="flex justify-content-between mb-3">
        {filterButtons.map(({ filterBy }) => (
          <Button
            label={filterBy}
            severity="secondary"
            outlined
          />
        ))}
      </div>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export function Explore() {
  return (
    <Layout>
      <ExploreContents />
    </Layout>
  );
}

export default Explore;
