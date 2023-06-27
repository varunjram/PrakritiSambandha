import axios from "axios";

export const getAllUsers = async (getUsers) => {
  try {
    const { data, status } = await axios("/api/users");
    if (status === 200) {
      getUsers("users", data?.users);
    }
  } catch (error) {
    console.error("error: while getting all users ", error);
  }
};

export const handleBookMark = async (type, authToken, postId, updateBookmarks) => {
  console.log("authToken123: ", { type, authToken, postId, updateBookmarks });
  try {
    const { data, status } = await axios.post(
      `api/users/${type}/${postId}`,
      {},
      {
        headers: { authorization: authToken },
      }
    );

    console.log("bookmark ", data?.bookmarks);

    if (status === 200) {
      updateBookmarks(data?.bookmarks);
    }
  } catch (error) {
    console.log(`error:${type}`, error);
  }
};
