// ** Follow Repository ** //
import { AxiosConfig } from "../../../axios/AxiosConfig";
import { Follow } from "./FollowEntity";
import { IFollowRepository } from "./IFollowRepository";
import { IGetFollowers, IGetStatus } from "./interface";

// ** Follow Repository ** //
export class FollowRepository implements IFollowRepository {
  // ** This method follows a user ** //
  async followUser(follow: Follow): Promise<Follow> {
    try {
      const response = await AxiosConfig.post("/follow", follow, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data === 200 || response.data === 201) {
        sessionStorage.setItem("following", "true");
      }
      return response.data;
    } catch (error) {
      throw new Error("Unable to follow user");
    }
  }

  // ** This method unfollows a user ** //
  async unfollowUser(follow: Follow): Promise<Follow> {
    try {
      const response = await AxiosConfig.delete("/unfollow", {
        data: follow,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to unfollow user");
    }
  }

  // ** This method blocks a user ** //
  async blockUser(follower_id: number, following_id: number): Promise<void> {
    try {
      await AxiosConfig.post(
        "/block",
        { follower_id, following_id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      throw new Error("Unable to block user");
    }
  }

  // ** This method unblocks a user ** //
  async unblockUser(follower_id: number, following_id: number): Promise<void> {
    try {
      await AxiosConfig.delete("/unblock", {
        params: { follower_id, following_id },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw new Error("Unable to unblock user");
    }
  }

  // ** This method gets all followers ** //
  async getFollowers(id: number): Promise<IGetFollowers[]> {
    try {
      const response = await AxiosConfig.get("/followers", {
        params: { id },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to get followers");
    }
  }

  // ** This method gets all following ** //
  async getFollowing(id: number): Promise<IGetFollowers[]> {
    try {
      const response = await AxiosConfig.get("/following", {
        params: { id },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to get following");
    }
  }

  // ** This method gets the status of a user ** //
  async getStatus(
    follower_id: number,
    following_id: number
  ): Promise<IGetStatus> {
    try {
      const response = await AxiosConfig.get("/status", {
        params: { follower_id, following_id },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response.data.status);
      return response.data.status;
    } catch (error) {
      throw new Error("Unable to get status");
    }
  }

  // ** This method gets the follower counts ** //
  async getFollowerCounts(user_id: number) {
    try {
      const response = await AxiosConfig.get("/followercounts", {
        params: { user_id },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("Unable to get follower counts");
    }
  }
}

export default FollowRepository;
