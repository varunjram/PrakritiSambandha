import moment from "moment";

// const example = {
//   posts:[
//     {
//         "_id": "103",
//         "content": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero t rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
//         "likes": {
//             "likeCount": 0,
//             "likedBy": [],
//             "dislikedBy": []
//         },
//         "username": "vjram",
//         "createdAt": "Wed Jun 21 2023 07:40:53 GMT+0530 (India Standard Time)",
//         "updatedAt": "2023-06-28T06:55:28+05:30",
//         "id": "3"
//     },
//     {
//         "_id": "101",
//         "content": "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
//         "likes": {
//             "likeCount": 0,
//             "likedBy": [],
//             "dislikedBy": []
//         },
//         "username": "adarshbalika",
//         "createdAt": "Wed Jun 21 2023 07:31:53 GMT+0530 (India Standard Time)",
//         "updatedAt": "2023-06-28T06:55:28+05:30",
//         "id": "1"
//     },
// ],
//   users: [
//     {
//       _id: "501",
//       firstName: "Adarsh",
//       lastName: "Balika",
//       username: "adarshbalika",
//       password: "adarshBalika123",
//       createdAt: "2023-06-28T06:53:37+05:30",
//       updatedAt: "2023-06-28T06:53:37+05:30",
//       followers: [],
//       following: [],
//       bookmarks: [],
//       id: "1",
//     },
//     {
//       _id: "502",
//       firstName: "Varun",
//       lastName: "Jayarama",
//       username: "vjram",
//       password: "1234567890",
//       createdAt: "2023-06-28T06:53:37+05:30",
//       updatedAt: "2023-06-28T06:53:37+05:30",
//       followers: [],
//       following: [],
//       bookmarks: [],
//       id: "2",
//     },
//   ],
// };

const appInitialState = {
  users: [],
  posts: [],
  userPosts: [],
  sortBy: "LATEST",
  avatarOptions: [
    "https://source.boringavatars.com/beam/120/Albert%20Einstein?colors=336633,669966,99cc99",
    "https://source.boringavatars.com/beam/120/Stefan?colors=264653,f4a261,e76f51",
    "https://source.boringavatars.com/beam/120/Sacagawea?colors=/ffffe5,dffda7,6ecf42",
    "https://source.boringavatars.com/beam/120/Hedy%20Lamarr?colors=666666,abdb25,999999,ffffff,cccccc",
    "https://source.boringavatars.com/beam/120/Nellie%20Bly?colors=184848,006060,007878,a8c030,f0f0d8",
    "https://source.boringavatars.com/beam/120/Mary%20Edwards?colors=a7cd2c,bada5f,cee891,e1f5c4,50c8c6",
    "https://source.boringavatars.com/beam/120/Felisa%20Rincon?colors=6e9167,ffdd8c,ff8030,cc4e00,700808",
    "https://source.boringavatars.com/beam/120/Lucy%20Stone?colors=53ac59,3b8952,0f684b,03484c,1c232e",
    "https://source.boringavatars.com/beam/120/Grace%20Hopper?colors=336699,3399cc,33cccc",

    "https://source.boringavatars.com/beam/120/Albert%20Einstein?colors=00ffff,33ccff,66b2ff",
  ],
};

const AppReducer = (state, { type, payload }) => {
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
