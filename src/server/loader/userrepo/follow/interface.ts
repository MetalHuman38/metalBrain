// ** IFollowRequest Interface ** //
export interface IFollowRequest {
  follower_id: number;
  following_id: number;
  status: "follow" | "unfollow" | "following" | "block";
  created_at: Date;
}

// ** IGetFollowers Interface ** //
export interface IGetFollowers {
  follower_id: number;
  following_id: number;
  status: "follow" | "unfollow" | "following" | "block";
  created_at: Date;
}

// ** IGetFollowing Interface ** //
export interface IGetFollowing {
  follower_id: number;
  following_id: number;
  status: "follow" | "unfollow" | "following" | "block";
  created_at: Date;
}

// ** IGetStatus Interface ** //
export interface IGetStatus {
  follower_id: number;
  following_id: number;
  status: "follow" | "unfollow" | "following" | "block";
  created_at: Date;
}

// ** IGetFollowerCounts Interface ** //
export interface IGetFollowerCounts {
  user_id: number;
  follower_count: number;
  following_count: number;
  created_at: Date;
  updated_at: Date;
}
