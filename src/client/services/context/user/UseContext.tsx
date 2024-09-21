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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        profileUser,
        setProfileUser,
        setVerifiedUser,
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
