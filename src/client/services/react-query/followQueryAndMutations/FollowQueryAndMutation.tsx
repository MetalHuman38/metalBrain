import { useMutation, useQuery } from "@tanstack/react-query";
import { FollowRepository } from "../followApiRepo/FollowRepository";
import FollowUseCase from "../followApiRepo/FollowUseCase";
import { Follow } from "../followApiRepo/FollowEntity";
import { FollowQueryKeys } from "../followApiRepo/FollowQueryKeys";

// ** Follow User Mutation ** //
export const useFollowUserMutation = () => {
  const followRepository = new FollowRepository();
  const followUseCase = new FollowUseCase(followRepository);
  return useMutation({
    mutationFn: (follow: Follow) => {
      return followUseCase.followUser(follow);
    },
  });
};

// ** Unfollow User Mutation ** //
export const useUnfollowUserMutation = () => {
  const followRepository = new FollowRepository();
  const followUseCase = new FollowUseCase(followRepository);
  return useMutation({
    mutationFn: (follow: Follow) => {
      return followUseCase.unfollowUser(follow);
    },
  });
};

// ** Block User Mutation ** //
export const useBlockUserMutation = () => {
  const followRepository = new FollowRepository();
  const followUseCase = new FollowUseCase(followRepository);
  return useMutation({
    mutationFn: (follow: { follower_id: number; following_id: number }) => {
      return followUseCase.blockUser(follow.follower_id, follow.following_id);
    },
  });
};

// ** Unblock User Mutation ** //
export const useUnblockUserMutation = () => {
  const followRepository = new FollowRepository();
  const followUseCase = new FollowUseCase(followRepository);
  return useMutation({
    mutationFn: (follow: { follower_id: number; following_id: number }) => {
      return followUseCase.unblockUser(follow.follower_id, follow.following_id);
    },
  });
};

// ** Get Followers Query ** //
export const useGetFollowersQuery = (id: number) => {
  const followRepository = new FollowRepository();
  const followUseCase = new FollowUseCase(followRepository);
  return useQuery({
    queryKey: [FollowQueryKeys.GET_FOLLOWERS, id],
    queryFn: () => {
      return followUseCase.getFollowers(id);
    },
    enabled: !!id,
  });
};

// ** Get Following Query ** //
export const useGetFollowingQuery = (id: number) => {
  const followRepository = new FollowRepository();
  const followUseCase = new FollowUseCase(followRepository);
  return useQuery({
    queryKey: [FollowQueryKeys.GET_FOLLOWING, id],
    queryFn: () => {
      return followUseCase.getFollowing(id);
    },
    enabled: !!id,
  });
};

// ** Get Status Query ** //
export const useGetStatusQuery = (
  follower_id: number,
  following_id: number
) => {
  const followRepository = new FollowRepository();
  const followUseCase = new FollowUseCase(followRepository);
  return useQuery({
    queryKey: [FollowQueryKeys.GET_STATUS, follower_id, following_id],
    queryFn: () => {
      return followUseCase.getStatus(follower_id, following_id);
    },
    enabled: !!follower_id && !!following_id,
  });
};

// ** Get Follower Counts Query ** //
export const useGetFollowerCountsQuery = (user_id: number) => {
  const followRepository = new FollowRepository();
  const followUseCase = new FollowUseCase(followRepository);
  return useQuery({
    queryKey: [FollowQueryKeys.GET_FOLLOW_COUNTS, user_id],
    queryFn: () => {
      return followUseCase.getFollowerCounts(user_id);
    },
    enabled: !!user_id,
  });
};

export default {
  useFollowUserMutation,
  useUnfollowUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetStatusQuery,
  useGetFollowerCountsQuery,
};
