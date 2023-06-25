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

export const addPost = async (addPosts, value, authToken) => {
  alert(authToken);
  console.log("authToken: ", authToken);
  try {
    const { data, status } = await axios.post(
      "/api/posts",
      { postData: { content: value } },
      {
        headers: {
          authorization: authToken,
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

export const handleLikeAndDislike = async (type, authToken, postId) => {
  alert("hit")
  try {
    const responseData = await axios.post(`/api/posts/like/3`, {}, {
      headers: {
        authorization: authToken,
      },
    });
    console.log("response: ", responseData);
    alert(JSON.stringify(responseData, null, 2));
  } catch (error) {
    console.error("error: ", error);
  }
};
