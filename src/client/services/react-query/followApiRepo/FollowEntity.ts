import { IFollowRequest } from "./interface";

// ** Class to handle the logic and behavior of following a user ** //
export class Follow implements IFollowRequest {
  constructor(
    public follower_id: number,
    public following_id: number,
    public status: "follow" | "unfollow" | "following" | "block",
    public created_at: Date
  ) {}

  follow(): boolean {
    return this.status === "follow";
  }

  unfollow(): boolean {
    return this.status === "unfollow";
  }

  following(): boolean {
    return this.status === "following";
  }

  block(): boolean {
    return this.status === "block";
  }

  isSelf(): boolean {
    return this.follower_id === this.following_id;
  }

  isBlocked(): boolean {
    return this.status === "block";
  }

  isFollowing(): boolean {
    return this.status === "follow";
  }

  isUnfollowing(): boolean {
    return this.status === "unfollow";
  }

  unblock(): void {
    this.status = "follow";
  }
}
