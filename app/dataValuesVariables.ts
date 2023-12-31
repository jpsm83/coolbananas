import { BiFoodMenu } from "react-icons/bi";
import {
  AiOutlineApple,
  AiOutlineCalendar,
  AiOutlineFieldTime,
  AiOutlineStar,
} from "react-icons/ai";
import { ImEarth } from "react-icons/im";
import { FaKitchenSet } from "react-icons/fa6";
import { GiFruitBowl } from "react-icons/gi";
import { LiaAllergiesSolid } from "react-icons/lia";
import { BsFillCalendarHeartFill } from "react-icons/bs";

export const categories = [
  {
    label: "Type",
    icon: BiFoodMenu,
    options: [
      "Appetizers",
      "BBQ",
      "Bread",
      "Breakfast",
      "Brunch",
      "Dinner",
      "Desert",
      "Drinks",
      "Lunch",
      "Salads",
      "Sauces",
      "Sides",
      "Snacks",
      "Soups",
      "Starters",
    ],
    description: "undefined",
  },
  {
    label: "Diet",
    icon: AiOutlineApple,
    options: [
      "Alcohol",
      "Alcohol free",
      "Carnivore",
      "Gluten free",
      "Healthy",
      "Keto",
      "Low carbs",
      "Low fat",
      "Mediterranean",
      "Raw",
      "Vegan",
      "Vegetarian",
      "Sweet",
    ],
    description: "undefined",
  },
  {
    label: "Cuisine",
    icon: ImEarth,
    options: [],
    description: "undefined",
  },
  {
    label: "Season",
    icon: AiOutlineCalendar,
    options: ["Autumn", "Spring", "Summer", "Winter"],
    description: "undefined",
  },
  {
    label: "Method",
    icon: FaKitchenSet,
    options: [
      "NO Cooking",
      "Air fryer",
      "Baking",
      "BBQ",
      "Blended",
      "Boiling",
      "Cooking Pan",
      "Frying",
      "Frozen",
      "Grilling",
      "Mashing",
      "Missing",
      "Microwave",
      "Oven",
      "Poaching",
      "Pressure cooker",
      "Roasting",
      "Sautéing",
      "Shake",
      "Simmering",
      "Slow cooking",
      "Smoking",
      "Stir fry",
      "Stirred",
      "Steaming",
    ],
    description: "undefined",
  },
  {
    label: "Time",
    icon: AiOutlineFieldTime,
    options: [],
    description: "undefined",
  },
  {
    label: "Ingredients",
    icon: GiFruitBowl,
    options: [],
    description: "undefined",
  },
  {
    label: "Allergens",
    icon: LiaAllergiesSolid,
    options: [
      "Celery",
      "Crustaceans",
      "Eggs",
      "Fish",
      "Gluten",
      "Lupin",
      "Milk",
      "Molluscs",
      "Mustard",
      "Nuts",
      "Sesame",
      "Soya",
      "Sulphites",
    ],
    description: "undefined",
  },
  {
    label: "Events",
    icon: BsFillCalendarHeartFill,
    options: [
      "Any time",
      "Birthdays",
      "Christmas",
      "Easter",
      "Father Day",
      "Games",
      "Halloween",
      "Mothers Day",
      "New years",
      "Thanksgiving",
      "Valentines",
    ],
    description: "undefined",
  },
  {
    label: "Ratings",
    icon: AiOutlineStar,
    options: [],
    description: "undefined",
  },
];

export const typeReports = [
  "Abusive Language",
  "Broken content",
  "General",
  "Misplaced photos",
  "Plagiarism",
  "Span",
];
