import { useState, useEffect } from "react";
import { useGetAllUserActivitiesQuery } from "@/client/services/react-query/userQueryAndMutations/UserQueriesMutations";
import { IUserActivities } from "@/client/services/entities/user";

export const useGetUserActivities = () => {
  const [userActivities, setUserActivities] = useState<IUserActivities>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const {
    data: acitivies,
    isLoading,
    error: queryError,
  } = useGetAllUserActivitiesQuery();

  if (isPending) {
    return { userActivities, isLoading, error };
  }

  useEffect(() => {
    if (acitivies) {
      setUserActivities(acitivies);
      setIsPending(false);
    }
    if (queryError) {
      setError(queryError);
      setIsPending(false);
    }
  }, [acitivies, queryError]);

  return { userActivities, isLoading, error };
};
