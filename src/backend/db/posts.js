import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: "101",
    content: `Before you begin planting, dig up a scoop of soil and take a look at its texture. Is it dense and heavy and clump together when wet? Or is it loose and free flowing, like play sand? Maybe it’s somewhere in between, feeling somewhat sticky but crumbling easily, like a freshly baked cookie.

      All soils are a mixture of mineral particles — primarily clay, sand, and silt. Often they will contain higher amounts of one type of particle relative to the others. That doesn’t make them bad growing mediums, but it will affect their density, drainage rate, and capacity to hold nutrients.`,
    likes: {
      likeCount: 3,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "Wed Jun 10 2023 07:31:53 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: "201",
    content: `Pruning and Training: Regularly prune and train your plants to maintain their shape, improve airflow, and encourage better fruiting or flowering. Pruning also helps remove dead or diseased branches, stimulates new growth, and keeps plants healthy and vigorous..`,
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "Wed Jun 10 2023 07:31:53 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: "202",
    content: `Planting for Pollinators: Create a pollinator-friendly garden by including a variety of flowers, herbs, and shrubs that attract bees, butterflies, and other beneficial insects. Pollinators play a crucial role in plant reproduction and ecosystem health, so providing them with a diverse and pesticide-free habitat is essential.`,
    image: "https://www.fix.com/assets/content/15638/friends-of-pollinator-garden.png",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    createdAt: "Wed Jun 19 2023 03:31:53 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: " 102",
    content: `Mulching: Apply a layer of organic mulch, such as wood chips or straw, around your plants. Mulching helps retain moisture, suppresses weed growth, and improves soil health by adding organic matter as it breaks down over time.`,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "varunjram",
    createdAt: "Wed Jun 21 2023 07:20:53 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: "103",
    content: `Composting: Start a compost pile or bin to recycle kitchen scraps, yard waste, and plant debris. Compost is a nutrient-rich soil amendment that improves soil structure, fertility, and overall plant health. It's an excellent way to reduce waste and create your own sustainable source of organic matter`,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "varunjram",
    createdAt: "Wed Jun 21 2023 07:40:53 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: "104",
    content: `Watering Techniques: Water your plants deeply and infrequently rather than shallow and frequently. This encourages deep root growth and makes plants more resilient during dry periods. Avoid overhead watering, as it can promote the spread of diseases. Instead, use methods like drip irrigation or soaker hoses to deliver water directly to the plant roots.`,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "varunjram",
    createdAt: "Wed Jun 21 2023 07:10:53 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: "105",
    content:
      "The true mind can weather all the lies and illusions without being lost. The true heart can touch the poison of hatred without being harmed. Since beginning less time, darkness thrives in the void, but always yields to purifying light",
    likes: {
      likeCount: 111,
      likedBy: [
        {
          _id: "501",
          firstName: "Adarsh",
          lastName: "Balika",
          username: "adarshbalika",
        },
      ],
      dislikedBy: [],
    },
    username: "lionTurtle",
    createdAt: "Wed Jan 21 2010 06:10:53 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: "106",
    content: `Garden beautifies your home and is an excellent way to spend your time after work. If you’re new to gardening, start building your garden, It is always better to take small steps towards big wins. Pick a small space to start building your garden.`,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "bulbasaur",
    createdAt: "Wed Jan 21 2023 06:10:53 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: "107",
    content: `Plants always benefit from the nutrient-rich gardening soil. Take your first step by examining the texture of your soil, it should be easily shovelled and crumble in your hands.Improving the quality of the soil is not as hard a task as you think, it comes with great benefits. Add organic compost made of tea compost, vegetable peels, to your soil to improve its quality.`,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "bulbasaur",
    createdAt: "Wed Jan 23 2023 09:10:53 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: "108",
    content: `Now comes the most exciting part of the gardening process - picking your greens. Before you rush to a conclusion on what to grow in your garden, take some time to study the plants.

    Some plants like direct sunlight while others prefer shade. You can check your plant seed package for this information. Picking the plants that are native to your area can make your life very easy, especially when you are about to become a plant parent.`,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "bulbasaur",
    createdAt: "Wed Jan 22 2023 03:10:53 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: "109",
    content: `Citrus plants are native to tropical and subtropical regions of southern Asia, Australia, and the South Pacific, but have been brought to all corners of the globe thanks to human cultivation. These woody plants range in size from small shrubs to large trees, and their fruit is just as variable in size and shape—just take a walk down the fruit aisle at your local supermarket! Standard-size grapefruit and orange trees can grow 18 to 22 feet tall, whereas dwarf citrus varieties only grow 8 to 12 feet tall (or smaller, if kept in containers).`,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "tangerine",
    createdAt: "Wed Feb 15 2023 05:11:60 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: "110",
    content: ` If planting a grafted variety of citrus, make sure that the graft union is 4 to 6 inches above the soil level. If planted too close to the ground, roots may form from the graft union, defeating the whole purpose of grafting! `,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "tangerine",
    createdAt: "Wed May 1 2023 06:13:20 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
  {
    _id: "111",
    content: `Warmth helps citrus fruit mature and sweeten, so citrus trees should be planted in a warm, sunny, and wind-protected area—planting along the southern side of a house or other structure will provide all three features. In cases where sweetness isn’t a concern (with lemons and limes, for example), extra warmth is less important.`,
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "tangerine",
    createdAt: "Wed May 12 2023 07:30:00 GMT+0530 (India Standard Time)",
    updatedAt: formatDate(),
  },
];
