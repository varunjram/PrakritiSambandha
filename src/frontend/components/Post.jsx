import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import React from "react";

function Post() {
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
          <h4 className="mr-2">Prakriti</h4>{" "}
          <span className="text-500">@prakritisambandha &#8729; 1 min</span>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quidem aspernatur deleniti
          quaerat minima fugit. atque in unde obcaecati, ipsum iste autem dolorum, dignissimos
          tempora. Dolorum sunt similique facilis, ab atque amet. Excepturi quisquam nam adipisci id
          in atque?
        </div>
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
