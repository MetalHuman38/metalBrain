import { UserCard } from "@/client/components/shared/card";
import { Loader } from "@/client/components/shared";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { useGetAllUsersQuery } from "@/client/services/react-query/userQueryAndMutations/UserQueriesMutations";
import { usePagination } from "@/client/components/hooks/use-Pagination";
import { useState } from "react";

const AllUsers = () => {
  const { limit, offset } = usePagination(10);
  const {
    data: usersdata,
    isPending,
    isError,
    error,
  } = useGetAllUsersQuery(limit, offset);
  const { toast } = useToast();
  // Add state to capture the search input
  const [searchTerm, setSearchTerm] = useState("");

  if (isError) {
    toast({
      title: "An error occurred",
      description: error.message,
    });
    return null;
  }

  if (isPending) {
    return <Loader />;
  }

  const creators = usersdata.users ? Object.values(usersdata.users) : [];

  // Filter users based on the search term
  const filteredUsers = creators.filter((creator: any) => {
    const fullName = `${creator.first_name} ${creator.last_name}`.toLowerCase();
    const username = creator.username.toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    return fullName.includes(searchLower) || username.includes(searchLower);
  });

  // Ensure users is an array
  if (
    !Array.isArray(creators) ||
    (Array.isArray(creators) && creators.length === 0)
  ) {
    return <Loader />;
  }

  return (
    <div className="common-container">
      <div className="explore-inner_creator">
        <div className="flex gap-1 px-4 w-full bg-dark-4 rounded-lg">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={24}
            height={24}
            className="flex-shrink-0"
          />
          <Input
            type="text"
            name="search"
            placeholder="Search top users"
            className="explore-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {filteredUsers?.length === 0 ? (
          <p>No creators found.</p>
        ) : (
          <ul className="user-grid">
            {filteredUsers?.map((creator: any, index: number) => (
              <li
                key={creator?.id ?? index}
                className="flex-1 min-w-w[200px] w-full"
              >
                <UserCard key={creator.id} user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
