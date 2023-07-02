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
    createdAt: formatDate("2023-01-02T13:01:00.540Z"),
    updatedAt: formatDate("2023-01-02T13:01:00.540Z"),
    customInfo: {
      tags: [
        "Senior Software Engineer @Microsoft",
        "Creator of India’s biggest programming community",
        " Tweets about JavaScript",
        "ReactJS",
        "Career and Startups",
      ],
      bio: "Past , present , future, all three things converge at one Place. That is YOU!!! ",
      portfolioUrl: "adarshbalika.com",
      avatar:
        "https://source.boringavatars.com/beam/120/Nellie%20Bly?colors=184848,006060,007878,a8c030,f0f0d8",
    },
    followers: [],
  },
  {
    _id: "502",
    firstName: "Varun",
    lastName: "Jayarama",
    username: "varunjram",
    password: "1234567890",
    createdAt: formatDate("2023-02-02T13:02:00.540Z"),
    updatedAt: formatDate("2023-02-02T13:02:00.540Z"),
    customInfo: {
      tags: ["Gardening", "Rider", "Developer", "Yoga", "Nature", "ReactJS"],
      bio: "Everything is Awesome",
      portfolioUrl: "varunjram.com",
      avatar:
        "https://source.boringavatars.com/beam/120/Albert%20Einstein?colors=336633,669966,99cc99",
    },
  },
  {
    _id: "503",
    firstName: "Bellemere",
    lastName: "",
    username: "tangerine",
    password: "1234567890",
    updatedAt: formatDate("2023-03-02T13:03:00.540Z"),
    createdAt: formatDate("2023-03-02T13:03:00.540Z"),
    customInfo: {
      tags: ["Farming ", "Ex-Marine", "tangerine", "Yoga", "Nature", "MACE"],
      bio: "As long as you're alive here...there will be better things and there will be many.",
      portfolioUrl: "bellemere@OnePiece.com",
      avatar: "https://i.pinimg.com/originals/22/b9/c4/22b9c439aaeb2dc307d0d1a5f4ca6f2b.jpg",
    },
  },
  {
    _id: "504",
    firstName: "Bulbasaur ",
    lastName: "",
    username: "bulbasaur",
    password: "1234567890",
    updatedAt: formatDate("2023-04-02T13:04:00.540Z"),
    createdAt: formatDate("2023-04-02T13:04:00.540Z"),
    customInfo: {
      tags: ["Pokemon ", "Grass", "Poison", "Solo", "Nature", "Plants"],
      bio: "Bulbasaur is a Grass/Poison type Pokémon introduced in Generation 1.",
      portfolioUrl: "bulbasaur@Pokemon.com",
      avatar: "https://img.pokemondb.net/artwork/large/bulbasaur.jpg",
    },
  },
  {
    _id: "505",
    firstName: "Lion ",
    lastName: "Turtle",
    username: "lionTurtle",
    password: "1234567890",
    updatedAt: formatDate("2023-05-02T13:05:00.540Z"),
    createdAt: formatDate("2023-05-02T13:05:00.540Z"),
    customInfo: {
      tags: [
        "Energy bending",
        "Protector",
        "Fire",
        "Spirit Wilds",
        "Nature",
        "Plants",
        "The Last One",
      ],
      bio: "The true mind can weather all the lies and illusions without being lost",
      portfolioUrl: "lionTurtle@Avatar.com",
      avatar:
        "https://64.media.tumblr.com/cac8b8aa98616c5387954879edff3fa8/tumblr_nx4vezAGQG1ro2qxuo2_r1_1280.jpg",
    },
  },
];
