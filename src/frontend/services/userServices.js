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
