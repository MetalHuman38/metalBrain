import useRefreshToken from "@/client/components/hooks/use-refreshToken";
import { useUserContext } from "@/client/services/context/user/UseContext";
import { useVerifyUserMutation } from "../../react-query/userQueryAndMutations/UserQueriesMutations";
import { IUser, users } from "../../entities/user";
import { useEffect, useState } from "react";
import { AxiosConfig } from "@/client/axios/AxiosConfig";
import { useNavigate, useParams } from "react-router-dom";

export const CurrentUser = () => {
  const { setIsUserAuthenticated } = useUserContext();
  const [user, setUser] = useState<users | IUser>();
  const verifyUser = useVerifyUserMutation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (user) {
      setUser(user);
      setIsUserAuthenticated(true);
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          AxiosConfig.defaults.headers.common["Authorization"] =
            `Bearer ${token}`;
        }
        const user = await verifyUser.mutateAsync(id as string);
        signal;
        if (isMounted && user) {
          setIsUserAuthenticated(true);
        }
      } catch (error: any) {
        if (error.response.status && error.response.status === 401) {
          console.log("User not authenticated", error.response.data.message);
          try {
            const newAccessToken = useRefreshToken();
            const response = await AxiosConfig.get("/currentUser", {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
              withCredentials: true,
              signal,
            });
            if (response.status === 200 && response.data.user) {
              sessionStorage.setItem("token", JSON.stringify(newAccessToken));
              AxiosConfig.defaults.headers.common["Authorization"] =
                `Bearer ${newAccessToken}`;
              fetchUser();
              setUser(response.data.user);
              setIsUserAuthenticated(true);
            }
          } catch (error: any) {
            console.log("Error fetching user", error);
            navigate("/sign-in", { state: { from: location }, replace: true });
          }
        } else {
          console.error("Error verifying user", error);
          setIsUserAuthenticated(false);
        }
      } finally {
        setIsUserAuthenticated(false);
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [verifyUser, navigate, user, setIsUserAuthenticated]);
};
