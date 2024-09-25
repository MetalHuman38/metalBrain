import { stats } from "./interface";

export const getStatData = (): stats[] => [
  {
    title: "Total Users",
    value: "1550",
    icon: "/assets/icons/user.svg",
    color: "bg-green-900",
  },
  {
    title: "Total Posts",
    value: "1000",
    icon: "/assets/icons/post.svg",
    color: "bg-sky-900",
  },
  {
    title: "Total Comments",
    value: "100000",
    icon: "/assets/icons/chat.svg",
    color: "bg-light-4",
  },
  {
    title: "Total Likes",
    value: "100",
    icon: "/assets/icons/like.svg",
    color: "bg-rose-950",
  },
];

// ** Mock Data for user activity chart ** //
export const userActivity = {
  series: [
    {
      name: "Posts",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
    {
      name: "Comments",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ],
  categories: [
    "01 Jan",
    "02 Jan",
    "03 Jan",
    "04 Jan",
    "05 Jan",
    "06 Jan",
    "07 Jan",
    "08 Jan",
    "09 Jan",
  ],
};
