import React, { useRef, useState } from "react";
import Layout from "../components/Layout";
import { Button } from "primereact/button";
import Post from "../components/Post";
import { useAppContext } from "../context/AppContext";
import { postFilterBy } from "../helperFunctions";
import { Toast } from "primereact/toast";

function ExploreContents() {
  const { posts, sortBy } = useAppContext();
  const [exploreBy, setExploreBy] = useState("All");
  
  const toast = useRef();

  const filterButtons = [
    {
      filterBy: "All",
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
      filterBy: "Soil",
    },
    {
      filterBy: "plants",
    },
  ];
  const postToDisplay = postFilterBy(sortBy, posts);
  const postToExplore = postToDisplay.filter((post) =>
    exploreBy === "All" ? true : post.content.toLowerCase().includes(exploreBy.toLowerCase())
  );

  return (
    <div>
      <Toast ref={toast} />

      <h1 className="mt-0">Explore - {postToExplore?.length} posts</h1>
      <div className="">
        <section className="flex justify-content-between mb-3">
          {filterButtons.map(({ filterBy }) => (
            <Button
              label={filterBy}
              severity="secondary"
              outlined
              raised={filterBy === exploreBy}
              onClick={(e) => {
                setExploreBy(filterBy);
              }}
            />
          ))}
        </section>
        <section>
          {postToExplore?.map((post, i) => (
            <Post
              key={`${post?._id}`}
              post={post}
              toast={toast}
            />
          ))}
        </section>
      </div>
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
