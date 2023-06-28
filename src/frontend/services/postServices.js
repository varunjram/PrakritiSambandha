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
    console.error("error: while adding user ", error);
  }
};

export const handleLikeAndDislike = async (type, authToken, postId, addPosts) => {
  console.log("authToken123: ", authToken);
  try {
    const { data, status } = await axios.post(
      `/api/posts/${type}/${postId}`,
      {},
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    if (status === 201) {
      addPosts("posts", data?.posts);
    }
  } catch (error) {
    console.error("error:while liking post ", error);
  }
};

export const handlePostEdit = async (authToken, contentToUpdate, postId, addPosts) => {
  try {
    const { data, status } = await axios.post(
      `/api/posts/edit/${postId}`,
      {
        postData: { content: contentToUpdate },
      },
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    console.log("edit post response ", { data, status });
    if (status === 201) {
      addPosts("posts", data?.posts);
    }
  } catch (error) {
    console.error("error:while editing post ", error);
  }
};

export const handlePostDelete = async (authToken, postId, addPosts) => {
  try {
    const { data, status } = await axios.delete(`/api/posts/${postId}`, {
      headers: {
        authorization: authToken,
      },
    });
    console.log("response", { data, status });
    if (status === 201) {
      addPosts("posts", data?.posts);
    }
  } catch (error) {
    console.error("error:while deleting post ", error);
  }
};

export const getAllUserPosts = async (username, addUserPosts) => {
  try {
    const { data, status } = await axios(`/api/posts/user/${username}`);
    console.log("getAllUserPosts", { data, status });
    if (status === 200) {
      addUserPosts("userPosts", data?.posts);
    }
  } catch (error) {
    console.error("error:getAllUserPosts  ", error);
  }
};
