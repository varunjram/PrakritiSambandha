import moment from "moment";

const appInitialState = {
  users: [],
  posts: [],
};

const AppReducer = (state, { type, payload }) => {
  const { posts } = state;
  switch (type) {
    case "GET_USERS":
      return { ...state, users: payload };
    case "UPDATE_APP_STATE":
      return { ...state, [payload?.key]: payload.value };
    case "LATEST_POSTS":
      const sort = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log("sort: ", sort);
      return { ...state, posts: sort };

    default:
      throw new Error("Not a reducer function");
  }
};

const LATEST_POSTS = "LATEST_POSTS";
const UPDATE_APP_STATE = "UPDATE_APP_STATE";

export { appInitialState, UPDATE_APP_STATE, LATEST_POSTS };

export default AppReducer;
