import { useCallback, useEffect, useState } from "react";
import { AxiosConfig } from "@/client/axios/AxiosConfig";
import { Follow } from "@/client/services/react-query/followApiRepo/FollowEntity";

const useRefreshStatus = (follow: Follow) => {
  const [status, setStatus] = useState("unfollow");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const refreshStatus = useCallback(async () => {
    setIsPending(true);
    setError(null);
    try {
      const cachedStatus = sessionStorage.getItem("followStatus");
      if (cachedStatus) {
        const parsedStatus = JSON.parse(cachedStatus);
        if (
          parsedStatus.follower_id === follow.follower_id &&
          parsedStatus.following_id === follow.following_id
        ) {
          setStatus(parsedStatus.status);
          setIsRefreshing(true);
          return parsedStatus;
        }
      }
      const response = await AxiosConfig.get("/status", {
        params: {
          follower_id: follow.follower_id,
          following_id: follow.following_id,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setStatus(response.data.status);
      setIsRefreshing(true);

      const followData = {
        follower_id: follow.follower_id,
        following_id: follow.following_id,
        status: response.data.status,
      };
      sessionStorage.setItem("followStatus", JSON.stringify(followData));
      return response.data.status;
    } catch (error) {
      setError(null);
      console.error("Error refreshing status", error);
      setIsRefreshing(false);
      throw Error("Error refreshing status");
    } finally {
      setIsPending(false);
    }
  }, [follow.follower_id, follow.following_id, status]);

  useEffect(() => {
    if (follow.follower_id && follow.following_id && !isRefreshing) {
      setIsRefreshing(true);
    }
  }, [follow.follower_id, follow.following_id, refreshStatus]);

  return { status, isPending, isRefreshing, refreshStatus, error };
};
export default useRefreshStatus;

// import { useCallback, useEffect, useState } from "react";
// import { AxiosConfig } from "@/client/axios/AxiosConfig";

// const useRefreshStatus = (follower_id: any, following_id: any) => {
//   const [status, setStatus] = useState("unfollow");
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [isPending, setIsPending] = useState(false);
//   const [error, setError] = useState<null | Error>(null);

//   const refreshStatus = useCallback(async () => {
//     setIsPending(true);
//     setError(null);
//     try {
//       const cachedStatus = sessionStorage.getItem("followStatus");
//       if (cachedStatus) {
//         const parsedStatus = JSON.parse(cachedStatus);
//         if (
//           parsedStatus.follower_id === follower_id &&
//           parsedStatus.following_id === following_id
//         ) {
//           setStatus(parsedStatus.status);
//           setIsRefreshing(true);
//           return parsedStatus;
//         }
//       }
//       const response = await AxiosConfig.get("/status", {
//         params: {
//           follower_id,
//           following_id,
//         },
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });
//       setStatus(response.data.status);
//       setIsRefreshing(true);

//       const followData = {
//         follower_id: follower_id,
//         following_id: following_id,
//         status: response.data.status,
//       };
//       sessionStorage.setItem("followStatus", JSON.stringify(followData));
//       return response.data.status;
//     } catch (error) {
//       setError(null);
//       console.error("Error refreshing status", error);
//       setIsRefreshing(false);
//       throw Error("Error refreshing status");
//     } finally {
//       setIsPending(false);
//     }
//   }, [follower_id, following_id, status]);

//   useEffect(() => {
//     if (follower_id && following_id && !isRefreshing) {
//       setIsRefreshing(true);
//     }
//   }, [follower_id, following_id, refreshStatus]);

//   return { status, isPending, isRefreshing, refreshStatus, error };
// };
// export default useRefreshStatus;
