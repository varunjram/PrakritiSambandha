import axios from "axios";

// const

export const getAllPosts = async (addPosts) => {
  try {
    const { data, status } = await axios("/api/posts");
    console.log("data: ", data);
    if (status === 200) {
      addPosts("posts", data?.posts);
    }
  } catch (error) {
    console.error("error: while getting all posts ", error);
  }
};

export const addPost = async (addPosts, value) => {
  try {
    const { data, status } = await axios.post(
      "/api/posts",
      { postData: { content: value } },
      {
        headers: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIwZjFmYjZiZC1mODkxLTRjNGYtOTQ3Yi1jOThhY2UwYTZhZDUiLCJ1c2VybmFtZSI6ImFkYXJzaGJhbGlrYSJ9.9_jR77l4xJRI7P9ppO6NwK-twRsQNImDsfUcJmBtkwY",
        },
      }
    );
    if (status === 201) {
      addPosts("posts", data?.posts);
      return status;
    }
    // console.log("updatedPost ", data);
  } catch (error) {
    alert(JSON.stringify(error, null, 2));
    console.error("error: while adding user ", error);
  }
};
