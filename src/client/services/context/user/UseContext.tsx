import { IUser } from "../../../types/index.js";
import React, { createContext, useContext, useEffect, useState } from "react";

export type UserContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isUserLoading: boolean;
  setIsUserLoading: (isLoading: boolean) => void;
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: (isAuthenticated: boolean) => void;
  isFollowing: boolean;
  setIsFollowing: (isFollowing: boolean) => void;
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

  useEffect(() => {
    const user = sessionStorage.getItem("token");
    if (user) {
      setUser(JSON.parse(user));
    }
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
