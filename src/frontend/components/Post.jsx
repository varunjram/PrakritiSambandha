import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import React from "react";
import { useAppContext } from "../context/AppContext";

function Post({ post }) {
  const { users } = useAppContext();

  const findUser = (username) => {
    const { firstName, lastName } = users?.find((user) => user?.username === username) || {};
    return `${firstName} ${lastName}`;
  };
  const { content, username } = post;

  console.log("postcard: ", post);
  const postButtons = [
    {
      icon: "heart",
      command: () => {
        alert("a");
      },
    },
    {
      icon: "chat-left",
      command: () => {
        alert("b");
      },
    },
    {
      icon: "share",
      command: () => {
        alert("c");
      },
    },
    {
      icon: "bookmark",
      command: () => {
        alert("c");
      },
    },
  ];
  return (
    <section className="flex surface-0 mb-4">
      <div className="p-3 pr-0">
        <Avatar
          image="https://source.boringavatars.com/beam"
          size="large"
          shape="circle"
          className="ml-auto "
        />
      </div>
      <div className="flex-grow-1 p-3 ">
        <div className="flex align-items-center ">
          <h4 className="mr-2">{findUser(username)}</h4>
          <span className="text-500">@{username} &#8729; 1 min</span>
        </div>
        <div>{content}</div>
        <div className="flex justify-content-between mt-2 ">
          {postButtons.map(({ icon, command }, index) => (
            <Button
              key={`${index}-${icon}`}
              icon={`bi bi-${icon}`}
              rounded
              text
              aria-label="Filter"
              onClick={command}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Post;
