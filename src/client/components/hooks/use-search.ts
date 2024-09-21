import { useState } from "react";

// Define a generic type for search types
type SearchType =
  | "searchPost"
  | "searchUser"
  | "username"
  | "email"
  | "first_name"
  | "last_name";

// Create a generic search hook
export const useSearch = <T,>(
  initialSearchValue: string,
  initialSearchType: SearchType
) => {
  const [searchInput, setSearchInput] = useState<string>(initialSearchValue);
  const [searchValue, setSearchValue] = useState<string>(initialSearchValue);
  const [searchType, setSearchType] = useState<SearchType>(initialSearchType);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<T[]>([]); // Use generic type T for search results
  const [error, setError] = useState<string | null>(null);

  // Function to handle the search action
  const handleSearch = async (value: string, type: SearchType) => {
    setSearchInput(value);
    setSearchValue(value);
    setSearchType(type);
    setIsSearching(true);
    setError(null);

    try {
      // Simulating a delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Example search results for posts or users
      if (type === "searchPost") {
        // Cast the results to the generic type T
        setSearchResults([
          { id: 1, title: "Post 1", content: "This is the content of post 1" },
          { id: 2, title: "Post 2", content: "This is the content of post 2" },
        ] as T[]);
      } else if (type === "searchUser" || type === "username") {
        setSearchResults([
          { id: 1, username: "user1" },
          { id: 2, username: "user2" },
          { id: 3, username: "user3" },
          { id: 4, username: "user4" },
          { id: 5, username: "user5" },
        ] as T[]);
      } else if (type === "email") {
        setSearchResults([
          { id: 1, email: "user1@example.com" },
          { id: 2, email: "user2@example.com" },
          { id: 3, email: "user3@example.com" },
          { id: 4, email: "user4@example.com" },
          { id: 5, email: "user5@example.com" },
        ] as T[]);
      } else if (type === "first_name") {
        setSearchResults([
          { id: 1, first_name: "John" },
          { id: 2, first_name: "John" },
          { id: 3, first_name: "John" },
          { id: 4, first_name: "John" },
          { id: 5, first_name: "John" },
        ] as T[]);
      } else if (type === "last_name") {
        setSearchResults([
          { id: 1, last_name: "John" },
          { id: 2, last_name: "John" },
          { id: 3, last_name: "John" },
          { id: 4, last_name: "John" },
          { id: 5, last_name: "John" },
        ] as T[]);
      }
    } catch (error) {
      setError("An error occurred while searching. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchInput,
    searchValue,
    searchType,
    isSearching,
    searchResults,
    error,
    setSearchValue,
    setSearchType,
    setSearchInput,
    handleSearch,
  };
};
