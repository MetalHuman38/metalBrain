// ** FollowUseCase.ts ** //
import { IFollowRepository } from "./IFollowRepository";
import { Follow } from "./FollowEntity";
import { IGetFollowers, IGetFollowing } from "./interface";

// ** Class to handle the logic and behavior of following a user ** //
export class FollowUseCase {
  constructor(private followRepo: IFollowRepository) {}

  // ** Method to follow a user ** //
  async followUser(follow: Follow): Promise<Follow> {
    if (follow.follower_id === follow.following_id) {
      throw new Error("You can't follow yourself from server");
    } else if (follow.status === "block") {
      throw new Error("You can't follow a blocked user");
    }
    return await this.followRepo.followUser(follow);
  }

  // ** Method to unfollow a user ** //
  async unfollowUser(follow: Follow): Promise<Follow> {
    return await this.followRepo.unfollowUser(follow);
  }

  // ** Method to block a user ** //
  async blockUser(follower_id: number, following_id: number): Promise<void> {
    if (follower_id === following_id) {
      throw new Error("You can't block yourself");
    }
    return await this.followRepo.blockUser(follower_id, following_id);
  }

  // ** Method to unblock a user ** //
  async unblockUser(follower_id: number, following_id: number): Promise<void> {
    return await this.followRepo.unblockUser(follower_id, following_id);
  }

  // ** Method to get followers ** //
  async getFollowers(id: number): Promise<IGetFollowers[]> {
    return await this.followRepo.getFollowers(id);
  }

  // ** Method to get following ** //
  async getFollowing(id: number): Promise<IGetFollowing[]> {
    return await this.followRepo.getFollowing(id);
  }

  // ** Method to get status ** //
  async getStatus(follower_id: number, following_id: number) {
    return await this.followRepo.getStatus(follower_id, following_id);
  }

  // ** Method to update follow status ** //
  async updateFollowStatus(
    follower_id: number,
    following_id: number,
    status: string
  ): Promise<void> {
    await this.followRepo.updateFollowStatus(follower_id, following_id, status);
  }
}

export default FollowUseCase;
// ** FollowUseCase.ts ** //
