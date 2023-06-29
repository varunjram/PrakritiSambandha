import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: "501",
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    customInfo: {
      tags: [
        "Senior Software Engineer @Microsoft",
        "Creator of India’s biggest programming community",
        " Tweets about JavaScript",
        "ReactJS",
        "Career and Startups",
      ],
      bio: "Everything is Awesome",
      portfolioUrl: "adarshbalika.com",
      avatar:
        "https://source.boringavatars.com/beam/120/Nellie%20Bly?colors=184848,006060,007878,a8c030,f0f0d8",
    },
  },
  {
    _id: "502",
    firstName: "Varun",
    lastName: "Jayarama",
    username: "varunjram",
    password: "1234567890",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    customInfo: {
      tags: ["Gardening", "Rider", "Developer", "Yoga", "Nature", "ReactJS"],
      bio: "Everything is Awesome",
      portfolioUrl: "varunjram.com",
      avatar:
        "https://source.boringavatars.com/beam/120/Albert%20Einstein?colors=336633,669966,99cc99",
    },
  },
];
