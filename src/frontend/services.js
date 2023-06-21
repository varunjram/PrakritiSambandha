import axios from "axios";

export const handleLogIn = async (form, updateUserLogIn) => {
  try {
    const { data, status } = await axios.post("/api/auth/login", form, {
      headers: { "Content-Type": "application/json" },
    });

    if (status === 200) {
      localStorage.setItem("socialToken", JSON.stringify(data?.encodedToken));
      localStorage.setItem("socialUser", JSON.stringify(data?.foundUser));
      updateUserLogIn(data?.foundUser);
      return status;
    }
  } catch (error) {
    console.error("handleLogIn", error);
  }
};

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
