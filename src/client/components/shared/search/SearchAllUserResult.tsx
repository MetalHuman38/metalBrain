import Loader from "@/client/components/shared/Loader";
import { IUser } from "@/client/services/entities/user";
import { useSearch } from "../../hooks/use-search";
import GridUserList from "../card/GridUserList";

const SearchAllUserResult = () => {
  const { searchResults, isSearching } = useSearch<IUser>(
    "first_name",
    "username"
  );

  if (isSearching) {
    return <Loader />;
  }

  if (searchResults && searchResults.length > 0) {
    return <GridUserList user={searchResults} showUser />;
  }

  return (
    <p className="text-light-4 mt-10 text-center w-full">No Result Found</p>
  );
};

export default SearchAllUserResult;
