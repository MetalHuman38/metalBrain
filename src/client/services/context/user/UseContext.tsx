import { IUser } from "../../entities/user";
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
import { useNavigate } from "react-router-dom";

export type UserContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
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
  const [user, setUser] = useState<IUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false);
  const [isUserAuthenticated, setIsUserAuthenticated] =
    useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const verifyUserMutation = useVerifyUserMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  const verifyUser = useCallback(async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setIsUserAuthenticated(false);
      setUser(null);
      setIsUserLoading(false);
      navigate("/sign-in", { replace: true });
      return;
    }
    setIsUserLoading(true);
    try {
      const response = await verifyUserMutation.mutateAsync(id as string);
      if (response) {
        setIsUserAuthenticated(true);
        console.log("verify user endpoint result", response);
      }
    } catch (error) {
      console.error(error);
      setIsUserAuthenticated(false);
      setUser(null);
    } finally {
      setIsUserLoading(false);
      setUser(null);
    }
  }, [verifyUserMutation]);

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
