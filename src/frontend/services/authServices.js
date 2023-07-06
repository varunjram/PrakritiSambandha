import axios from "axios";

export const handleLogIn = async (form, updateUserLogIn) => {
  try {
    const { data, status } = await axios.post("/api/auth/login", form, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("logindata: ", data);

    if (status === 200) {
      localStorage.setItem("socialToken", JSON.stringify(data?.encodedToken));
      localStorage.setItem("socialUser", JSON.stringify(data?.foundUser));
      updateUserLogIn({ user: data?.foundUser, token: data?.encodedToken });
      return status;
    }
  } catch (error) {
    console.error("handleLogIn", error);
  }
};

export const handSignUp = async (form) => {
  console.log("form1123: ", form);
  try {
    const { status, data } = await axios.post(
      "/api/auth/signup",
      { ...form, test: { awesome: "awesome" } },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("{ status, data }: ", { status, data });
    if (status === 201) {
      localStorage.setItem("socialToken", JSON.stringify(data?.encodedToken));
      localStorage.setItem("socialUser", JSON.stringify(data?.createdUser));
      return { status, data };
    }
  } catch (error) {
    console.log("error: while Creating new User ", error);
  }
};
