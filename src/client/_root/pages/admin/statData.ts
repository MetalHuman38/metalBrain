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
    value: "10000",
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
