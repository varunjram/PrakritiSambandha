import moment from "moment";

const appInitialState = {
  users: [],
  posts: [],
  sortBy: "LATEST",
};

const AppReducer = (state, { type, payload }) => {
  const { posts } = state;
  switch (type) {
    case "GET_USERS":
      return { ...state, users: payload };
    case "UPDATE_APP_STATE":
      return { ...state, [payload?.key]: payload.value };
    case "UPDATE_SORTBY_METHOD":
      return { ...state, sortBy: payload };
    // case "LATEST_POSTS":
    //   const sort = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //   console.log("sort: ", sort);
    //   return { ...state, posts: sort };

    default:
      throw new Error("Not a reducer function");
  }
};

// const LATEST_POSTS = "LATEST_POSTS";
const UPDATE_APP_STATE = "UPDATE_APP_STATE";
const UPDATE_SORTBY_METHOD = "UPDATE_SORTBY_METHOD";

export { appInitialState, UPDATE_APP_STATE, UPDATE_SORTBY_METHOD };

export default AppReducer;
