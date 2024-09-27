import { useState, useEffect } from "react";
import { useGetAllUserActivitiesQuery } from "@/client/services/react-query/userQueryAndMutations/UserQueriesMutations";
import { IUserActivities } from "@/client/services/entities/user";

export const useGetUserActivities = () => {
  const [userActivities, setUserActivities] = useState<IUserActivities[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const { data, isLoading, error: queryError } = useGetAllUserActivitiesQuery();

  useEffect(() => {
    if (Array.isArray(data)) {
      setUserActivities(data);
    }
    if (queryError) {
      setError(queryError);
    }
  }, [data, queryError]);

  return { userActivities, isLoading, error };
};
