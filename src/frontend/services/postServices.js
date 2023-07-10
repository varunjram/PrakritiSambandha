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

export const addPost = async (addPosts, postContent, authToken, files) => {
  try {
    const preset = process.env.REACT_APP_CLOUDINARY_PRESET;
    const cloud = process.env.REACT_APP_CLOUDINARY_NAME;
    const imagedata = new FormData();
    imagedata.append("file", files[0]);
    imagedata.append("upload_preset", preset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
      method: "POST",
      body: imagedata,
    });
    const file = await res.json();

    const { data, status } = await axios.post(
      "/api/posts",
      { postData: { content: postContent?.postTextBody, image: file?.secure_url } },
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
  } catch (error) {
    console.error("error: while adding post ", error);
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
      return { status };
    }
  } catch (error) {
    console.error(`error:while ${type} post `, error);
  }
};

export const handlePostEdit = async (authToken, contentToUpdate, postId, addPosts, files) => {
  try {
    const preset = process.env.REACT_APP_CLOUDINARY_PRESET;
    const cloud = process.env.REACT_APP_CLOUDINARY_NAME;
    const imagedata = new FormData();
    imagedata.append("file", files[0]);
    imagedata.append("upload_preset", preset);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
      method: "POST",
      body: imagedata,
    });
    const file = await res.json();

    const { data, status } = await axios.post(
      `/api/posts/edit/${postId}`,
      {
        postData: { content: contentToUpdate, image: file?.secure_url },
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
      return { status };
    }
  } catch (error) {
    console.error("error:while editing post ", error);
  }
};

export const handlePostDelete = async (authToken, postId, deletePost) => {
  try {
    const { data, status } = await axios.delete(`/api/posts/${postId}`, {
      headers: {
        authorization: authToken,
      },
    });
    console.log("response", { data, status });
    if (status === 201) {
      deletePost("posts", data?.posts);
      return { status };
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

export const postFollowHandler = async (
  type,
  authToken,
  followUserId,
  UpdateAuthUser,
  UpdateAppUsers
) => {
  console.log("authToken123: ", authToken);
  try {
    const { data, status } = await axios.post(
      `/api/users/${type}/${followUserId}`,
      {},
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    console.log("postFollowHandler: ", data);
    console.log("postFollowHandler: ", status);
    if (status === 200) {
      UpdateAuthUser(data?.user);
      UpdateAppUsers([data?.followUser, data?.user]);
    }
  } catch (error) {
    console.error(`error:while ${type} post `, error);
  }
};
