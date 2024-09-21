import { Follow } from "./FollowEntity";
import {
  IGetFollowerCounts,
  IGetFollowers,
  IGetFollowing,
  IGetStatus,
} from "./interface";

// ** Interface for the Follow Repository ** //
export interface IFollowRepository {
  followUser(follow: Follow): Promise<Follow>;
  unfollowUser(follow: Follow): Promise<Follow>;
  blockUser(follower_id: number, following_id: number): Promise<void>;
  unblockUser(follower_id: number, following_id: number): Promise<void>;
  getFollowers(id: number): Promise<IGetFollowers[]>;
  getFollowing(id: number): Promise<IGetFollowing[]>;
  getStatus(follower_id: number, following_id: number): Promise<IGetStatus>;
  getFollowerCounts(user_id: number): Promise<IGetFollowerCounts>;
}

export default IFollowRepository;
