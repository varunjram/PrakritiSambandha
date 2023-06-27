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
  },
  {
    _id: "502",
    firstName: "Varun",
    lastName: "Jayarama",
    username: "vjram",
    password: "1234567890",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
