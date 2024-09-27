import { IChartData, IUserActivities } from "@/client/services/entities/user";

// Helper function to encapsulate chart data creation
export const getUserActivityChartData = (
  activities: IUserActivities[]
): IChartData => {
  const categories: string[] = [];
  const posts: number[] = [];
  const comments: number[] = [];
  const likes: number[] = [];
  const follow: number[] = [];
  const unfollow: number[] = [];

  activities.forEach((activity) => {
    // Extract the date and format it
    const formattedDate = new Date(activity.created_at).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
      }
    );

    // ** Add to categories if not already present ** //
    if (!categories.includes(formattedDate)) {
      categories.push(formattedDate);
      posts.push(0);
      comments.push(0);
      likes.push(0);
      follow.push(0);
      unfollow.push(0);
    }

    const dateIndex = categories.indexOf(formattedDate);

    // Handle the activity type and push data accordingly
    if (activity.activity_type === "post") {
      posts[dateIndex] += 1; // increment for posts
    } else if (activity.activity_type === "comment") {
      comments[dateIndex] += 1; // increment for comments
    } else if (activity.activity_type === "like") {
      // increment for likes
      likes[dateIndex] += 1;
    } else if (activity.activity_type === "follow") {
      // increment for follow
      follow[dateIndex] += 1;
    } else if (activity.activity_type === "unfollow") {
      // increment for unfollow
      unfollow[dateIndex] += 1;
    }
  });

  // Return the structured chart data
  return {
    series: [
      { name: "Posts", data: posts },
      { name: "Comments", data: comments },
      { name: "Likes", data: likes },
      { name: "Follow", data: follow },
      { name: "Unfollow", data: unfollow },
    ],
    categories,
  };
};

export default getUserActivityChartData;
