const appInitialState = {
  users: [],
};

const AppReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_USERS":
      return { ...state, users: payload };

    default:
      throw new Error("Not a reducer function");
  }
};

const GET_USERS = "GET_USERS";

export { appInitialState, GET_USERS };

export default AppReducer;
