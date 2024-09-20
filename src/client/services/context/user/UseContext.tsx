import { IUser, IVerifyUser } from "../../entities/user";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useVerifyUserMutation } from "../../react-query/userQueryAndMutations/UserQueriesMutations";
import { useParams } from "react-router-dom";

export type UserContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  profileUser: IUser | null;
  setProfileUser: (user: IUser | null) => void;
  setVerifiedUser: (verifiedUser: IVerifyUser) => void;
  status: "follow" | "following" | "unfollow" | "block";
  setStatus: Dispatch<
    SetStateAction<"follow" | "following" | "unfollow" | "block">
  >;
  follower_id: number;
  setFollower_id: Dispatch<SetStateAction<number>>;
  following_id: number;
  setFollowing_id: Dispatch<SetStateAction<number>>;
  followerCount: number;
  followingCount: number;
  setFollowerCount: Dispatch<SetStateAction<number>>;
  setFollowingCount: Dispatch<SetStateAction<number>>;
  isUserLoading: boolean;
  setIsUserLoading: (isLoading: boolean) => void;
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: (isAuthenticated: boolean) => void;
  isFollowing: boolean;
  setIsFollowing: (isFollowing: boolean) => void;
  setAuthenticatedUser: Dispatch<SetStateAction<{}>>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  profileUser: null,
  setProfileUser: () => {},
  setVerifiedUser: () => {},
  status: "follow", // **  Add the correct status values here ** //
  setStatus: () => {},
  follower_id: 0,
  setFollower_id: () => {},
  following_id: 0,
  setFollowing_id: () => {},
  followerCount: 0,
  followingCount: 0,
  setFollowerCount: () => {},
  setFollowingCount: () => {},
  isUserLoading: false,
  setIsUserLoading: () => {},
  isUserAuthenticated: false,
  setIsUserAuthenticated: () => {},
  isFollowing: false,
  setIsFollowing: () => {},
  setAuthenticatedUser: () => {},
});

export const useUserContext = () => useContext(UserContext);

type UserProviderProps = {
  children: React.ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<IUser | null>(() => {
    // **  Retrieve the user from session storage if available on initial load ** //
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [profileUser, setProfileUser] = useState<IUser | null>(() => {
    // **  Retrieve the user from session storage if available on initial load ** //
    const storedProfileUser = sessionStorage.getItem("profileUser");
    return storedProfileUser ? JSON.parse(storedProfileUser) : null;
  });
  const [status, setStatus] = useState<
    "follow" | "following" | "unfollow" | "block"
  >(() => {
    const storedStatus = sessionStorage.getItem("followStatus");
    if (storedStatus) {
      const parsedStatus = JSON.parse(storedStatus);
      console.log("parsedStatus: ", parsedStatus);
      return parsedStatus.status;
    }
    return "follow";
  });

  const [follower_id, setFollower_id] = useState<number>(() => {
    const storedFollowData = sessionStorage.getItem("followStatus");
    if (storedFollowData) {
      const parsedFollowData = JSON.parse(storedFollowData);
      return parsedFollowData.follower_id;
    }
    return null;
  });

  const [following_id, setFollowing_id] = useState<number>(() => {
    const storedFollowData = sessionStorage.getItem("followStatus");
    if (storedFollowData) {
      const parsedFollowData = JSON.parse(storedFollowData);
      return parsedFollowData.following_id;
    }
    return null;
  });

  const [followerCount, setFollowerCount] = useState<number>(() => {
    const storedFollowerCount = sessionStorage.getItem("followerCount");
    return storedFollowerCount ? JSON.parse(storedFollowerCount) : 0; // default to 0
  });

  const [followingCount, setFollowingCount] = useState<number>(() => {
    const storedFollowingCount = sessionStorage.getItem("followingCount");
    return storedFollowingCount ? JSON.parse(storedFollowingCount) : 0; // default to 0
  });

  const [verifiedUser, setVerifiedUser] = useState<IVerifyUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [isUserAuthenticated, setIsUserAuthenticated] =
    useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const { id } = useParams();
  const verifyUserMutation = useVerifyUserMutation();

  const verifyUser = useCallback(async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setIsUserAuthenticated(false);
      setUser(null);
      setIsUserLoading(false);
      return;
    }
    setIsUserLoading(true);
    try {
      const response = await verifyUserMutation.mutateAsync(id as string);
      if (response) {
        verifiedUser && setVerifiedUser(response);
        setIsUserAuthenticated(true);
        console.log("verify user endpoint result", response);
      }
    } catch (error) {
      console.error(error);
      setIsUserAuthenticated(false);
      setUser(null);
    } finally {
      setIsUserLoading(false);
    }
  }, [verifyUserMutation, id]);

  useEffect(() => {
    const authenticatedUser = async () => {
      verifyUser();
    };
    authenticatedUser();
  }, []);

  // ** Update sessionStorage whenever the status changes ** //
  useEffect(() => {
    if (status) {
      sessionStorage.setItem("followStatus", JSON.stringify(status));
    }
  }, [status]);

  useEffect(() => {
    if (followerCount) {
      sessionStorage.setItem("followerCount", JSON.stringify(followerCount));
    }
  }, [followerCount]);

  useEffect(() => {
    if (followingCount) {
      sessionStorage.setItem("followingCount", JSON.stringify(followingCount));
    }
  }, [followingCount]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        profileUser,
        setProfileUser,
        setVerifiedUser,
        status,
        setStatus,
        follower_id,
        setFollower_id,
        following_id,
        setFollowing_id,
        followerCount,
        followingCount,
        setFollowerCount,
        setFollowingCount,
        isUserLoading,
        setIsUserLoading,
        isUserAuthenticated,
        setIsUserAuthenticated,
        isFollowing,
        setIsFollowing,
        setAuthenticatedUser: () => {},
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
