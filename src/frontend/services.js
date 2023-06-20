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
