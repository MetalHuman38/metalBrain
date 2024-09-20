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

export interface IGetStatus {
  follower_id: number;
  following_id: number;
  status: "follow" | "unfollow" | "following" | "block";
  created_at: Date;
}
