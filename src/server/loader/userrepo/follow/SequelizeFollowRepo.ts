import { IFollowRepository } from "./IFollowRepository.js";
import { Follow } from "../follow/FollowEntity.js";
import {
  IGetFollowerCounts,
  IGetFollowers,
  IGetFollowing,
  IGetStatus,
} from "./interface.js";
import { Follow as FollowEntity } from "../follow/FollowEntity.js";
import follows from "../../sequelize/models/usermodels/follow.model.js";
import follow_counts from "../../sequelize/models/usermodels/followcount.model.js";

// ** Class to handle the logic and behavior of following a user ** //
export class SequelizeFollowRepo implements IFollowRepository {
  // ** Method to follow a user ** //
  async followUser(follow: Follow): Promise<Follow> {
    const newFollow = await follows.create({
      follower_id: follow.follower_id,
      following_id: follow.following_id,
      status: "following",
      created_at: follow.created_at,
    });

    await follows.update(
      {
        status: "following",
      },
      {
        where: {
          follower_id: follow.follower_id,
          following_id: follow.following_id,
        },
      }
    );
    // ** Ensure follow_counts entries exist before incrementing ** //
    await follow_counts.upsert({
      user_id: follow.follower_id,
      follower_count: 0,
      following_count: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await follow_counts.upsert({
      user_id: follow.following_id,
      follower_count: 0,
      following_count: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // ** Increment the follower count ** //
    await follow_counts.increment("follower_count", {
      by: 1,
      where: { user_id: follow.following_id },
    });

    // ** Increment the following count ** //
    await follow_counts.increment("following_count", {
      by: 1,
      where: { user_id: follow.follower_id },
    });

    return new FollowEntity(
      newFollow.follower_id,
      newFollow.following_id,
      newFollow.status,
      newFollow.created_at
    );
  }

  // ** Method to unfollow a user ** //
  async unfollowUser(follow: Follow): Promise<Follow> {
    // First, find the follow record
    const existingFollow = await follows.findOne({
      where: {
        follower_id: follow.follower_id,
        following_id: follow.following_id,
      },
    });

    if (!existingFollow) {
      return new FollowEntity(
        follow.follower_id,
        follow.following_id,
        follow.status,
        follow.created_at
      );
    }
    // Then, destroy (delete) the follow record
    await follows.destroy({
      where: {
        follower_id: follow.follower_id,
        following_id: follow.following_id,
      },
    });

    // ** Decrement the follower count ** //
    await follow_counts.decrement("follower_count", {
      by: 1,
      where: { user_id: follow.following_id },
    });

    // ** Decrement the following count ** //
    await follow_counts.decrement("following_count", {
      by: 1,
      where: { user_id: follow.follower_id },
    });

    return new FollowEntity(
      existingFollow.follower_id,
      existingFollow.following_id,
      existingFollow.status,
      existingFollow.created_at
    );
  }

  // ** Method to block a user ** //
  async blockUser(follower_id: number, following_id: number): Promise<void> {
    await follows.update(
      { status: "block" },
      {
        where: {
          follower_id,
          following_id,
        },
      }
    );
  }

  // ** Method to unblock a user ** //
  async unblockUser(follower_id: number, following_id: number): Promise<void> {
    await follows.update(
      { status: "follow" },
      {
        where: {
          follower_id,
          following_id,
        },
      }
    );
  }

  // ** Method to get followers ** //
  async getFollowers(id: number): Promise<IGetFollowers[]> {
    const followers = await follows.findAll({
      where: { following_id: id },
      attributes: ["follower_id", "following_id", "status", "created_at"],
    });
    return followers.map((follower) => ({
      follower_id: follower.follower_id,
      following_id: follower.following_id,
      status: follower.status,
      created_at: follower.created_at,
    }));
  }

  // ** Method to get following ** //
  async getFollowing(id: number): Promise<IGetFollowing[]> {
    const following = await follows.findAll({
      where: { follower_id: id },
      attributes: ["follower_id", "following_id", "status", "created_at"],
    });
    return following.map((follow) => ({
      follower_id: follow.follower_id,
      following_id: follow.following_id,
      status: follow.status,
      created_at: follow.created_at,
    }));
  }

  // ** Method to get status ** //
  async getStatus(
    follower_id: number,
    following_id: number
  ): Promise<IGetStatus> {
    const status = await follows.findOne({
      where: { follower_id, following_id },
      attributes: ["follower_id", "following_id", "status", "created_at"],
    });
    if (!status) {
      return {
        follower_id,
        following_id,
        status: "follow" as "follow" | "unfollow" | "following" | "block",
        created_at: new Date(),
      };
    }
    return {
      follower_id,
      following_id,
      status: status.status,
      created_at: status.created_at,
    };
  }

  // ** Method to update follow status when a user is followed or unfollowed ** //
  async updateFollowStatus(
    follower_id: number,
    following_id: number,
    status: "follow" | "unfollow" | "following" | "block"
  ): Promise<void> {
    const newFollow = new FollowEntity(
      follower_id,
      following_id,
      status,
      new Date()
    );
    // If the status is follow, update the status to following
    if (status === "follow") {
      newFollow.status = "following";
    } else if (status === "unfollow") {
      newFollow.status = "unfollow";
    }
    const updatedFollow = await follows.update(
      { status: newFollow.status },
      {
        where: {
          follower_id: follower_id,
          following_id: following_id,
        },
        returning: true,
      }
    );
    if (!updatedFollow[0]) {
      throw new Error("Unable to update follow status");
    }
  }

  // ** Method to get follower counts ** //
  async getFollowerCounts(user_id: number): Promise<IGetFollowerCounts> {
    const followerCounts = await follow_counts.findOne({
      where: { user_id: user_id },
      attributes: [
        "user_id",
        "follower_count",
        "following_count",
        "created_at",
        "updated_at",
      ],
    });
    if (!followerCounts) {
      return {
        user_id: user_id,
        follower_count: 0,
        following_count: 0,
        created_at: new Date(),
        updated_at: new Date(),
      };
    }
    return {
      user_id: followerCounts.user_id,
      follower_count: followerCounts.follower_count,
      following_count: followerCounts.following_count,
      created_at: followerCounts.created_at,
      updated_at: followerCounts.updated_at,
    };
  }
}

export default { SequelizeFollowRepo };
