const appInitialState = {
  users: [],
};

const AppReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_USERS":
      return { ...state, users: payload };
    case "UPDATE_APP_STATE":
      return { ...state, [payload?.key]: payload.value };

    default:
      throw new Error("Not a reducer function");
  }
};

const GET_USERS = "GET_USERS";
const UPDATE_APP_STATE = "UPDATE_APP_STATE";

export { appInitialState, UPDATE_APP_STATE };

export default AppReducer;
