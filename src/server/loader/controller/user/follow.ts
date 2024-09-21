import { Request, Response } from "express";
import { FollowUseCase } from "../../userrepo/follow/FollowUseCase.js";
import { Follow } from "../../userrepo/follow/FollowEntity.js";

// ** Class to handle the logic and behavior of following a user controller ** //
export class FollowController {
  constructor(private followUseCase: FollowUseCase) {}

  // ** Method to follow a user ** //
  async followUser(req: Request, res: Response): Promise<void> {
    try {
      const follow = new Follow(
        req.body.follower_id,
        req.body.following_id,
        req.body.status,
        req.body.created_at
      );
      const newFollow = await this.followUseCase.followUser(follow);
      res.status(201).json(newFollow);
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  }

  // ** Method to unfollow a user ** //
  async unfollowUser(req: Request, res: Response): Promise<void> {
    try {
      const unfollow = new Follow(
        req.body.follower_id,
        req.body.following_id,
        req.body.status,
        req.body.created_at
      );
      await this.followUseCase.unfollowUser(unfollow);
      res.status(200).json({ message: "User unfollowed" });
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  }

  // ** Method to block a user ** //
  async blockUser(req: Request, res: Response): Promise<void> {
    try {
      await this.followUseCase.blockUser(
        req.body.follower_id,
        req.body.following_id
      );
      res.status(200).json({ message: "User blocked" });
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  }

  // ** Method to unblock a user ** //
  async unblockUser(req: Request, res: Response): Promise<void> {
    try {
      await this.followUseCase.unblockUser(
        req.body.follower_id,
        req.body.following_id
      );
      res.status(200).json({ message: "User unblocked" });
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  }

  // ** Method to get followers ** //
  async getFollowers(req: Request, res: Response): Promise<void> {
    try {
      const follower_id = parseInt(req.body.follower_id as string, 10);
      const followers = await this.followUseCase.getFollowers(follower_id);
      res.status(200).json(followers);
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  }

  // ** Method to get following ** //
  async getFollowing(req: Request, res: Response): Promise<void> {
    try {
      const following_id = parseInt(req.body.following_id as string, 10);
      const following = await this.followUseCase.getFollowing(following_id);
      res.status(200).json(following);
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  }

  // ** Method to get status ** //
  async getStatus(req: Request, res: Response): Promise<void> {
    try {
      const follower_id = parseInt(req.query.follower_id as string, 10);
      const following_id = parseInt(req.query.following_id as string, 10);

      if (
        isNaN(follower_id) ||
        isNaN(following_id) ||
        follower_id === undefined ||
        following_id === undefined
      ) {
        throw new Error("Invalid follower_id or following_id");
      }
      const status = await this.followUseCase.getStatus(
        follower_id,
        following_id
      );
      console.log("Status from the controller", status);
      res.status(200).json(status);
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  }

  // ** Method to update follow status ** //
  async updateFollowStatus(req: Request, res: Response): Promise<void> {
    try {
      const follower_id = parseInt(req.query.follower_id as string, 10);
      const following_id = parseInt(req.query.following_id as string, 10);
      const status = req.query.status as string;
      if (
        isNaN(follower_id) ||
        isNaN(following_id) ||
        follower_id === undefined ||
        following_id === undefined
      ) {
        throw new Error("Invalid follower_id or following_id");
      }

      const updatedFollow = await this.followUseCase.updateFollowStatus(
        follower_id,
        following_id,
        status
      );
      res.status(200).json(updatedFollow);
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  }

  // ** Method to get follower counts ** //
  async getFollowerCounts(req: Request, res: Response): Promise<void> {
    try {
      const user_id = parseInt(req.query.user_id as string, 10);
      if (isNaN(user_id) || user_id === undefined) {
        throw new Error("Invalid user_id");
      }
      const followerCounts =
        await this.followUseCase.getFollowerCounts(user_id);
      res.status(200).json(followerCounts);
    } catch (error) {
      res.status(400).json({ error: (error as any).message });
    }
  }
}
