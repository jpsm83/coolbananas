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
      "Breakfast",
      "Lunch",
      "Brunch",
      "Dinner",
      "Appetizers",
      "Snacks",
      "Salads",
      "Sides",
      "Soups",
      "Bread",
      "Drinks",
      "Desert",
      "Sauces",
      "Starters",
      "Mains",
      "BBQ",
    ],
    description: "undefined",
  },
  {
    label: "Diet",
    icon: AiOutlineApple,
    options: [
      "Mediterranean",
      "Low fat",
      "Keto",
      "Plant based",
      "Vegan",
      "Carnivore",
      "Vegetarian",
      "Dairy free",
      "Dukna",
      "Healthy",
      "Low carbs",
      "Raw",
      "Gluten free",
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
    options: ["Summer", "Spring", "Autumn", "Winter"],
    description: "undefined",
  },
  {
    label: "Method",
    icon: FaKitchenSet,
    options: [
      "Baking",
      "Roasting",
      "Grilling",
      "Oven",
      "Frying",
      "Boiling",
      "Simmering",
      "Steaming",
      "Poaching",
      "Stir fry",
      "Microwave",
      "Smoking",
      "Slow cooking",
      "Air fryer",
      "BBQ",
      "Pressure cooker",
      "Shake",
      "Stired",
      "Blended",
      "Frozen",
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
      "Nuts",
      "Cereal Gluten",
      "Peanuts",
      "Crustaceans",
      "Sesame Seeds",
      "Eggs",
      "Soya",
      "Fish",
      "Sulphur dioxide",
      "Lupin",
      "Mustard",
      "Dairy",
      "Molluscs",
    ],
    description: "undefined",
  },
  {
    label: "Events",
    icon: BsFillCalendarHeartFill,
    options: [
      "Any time",
      "Games",
      "Mothers Day",
      "Father Day",
      "Birthdays",
      "Christmas",
      "Easter",
      "Thanks given",
      "New years",
      "Valentines",
      "Halloween",
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
  "Span",
  "Plagiarism",
  "Broken content",
  "Abusive Language",
  "Misplaced photos",
  "General",
];