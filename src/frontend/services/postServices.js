import axios from "axios";

export const getAllPosts = async (getPosts) => {
  try {
    const { data, status } = await axios("/api/posts");
    console.log("data: ", data);
    if (status === 200) {
      getPosts("posts", data?.posts);
    }
  } catch (error) {
    console.error("error: while getting all posts ", error);
  }
};
