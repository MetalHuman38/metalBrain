import { useState } from "react";

export const usePagination = (initialLimit: number = 10) => {
  const [limit, setLimit] = useState(initialLimit);
  const [offset, setOffset] = useState(0);

  // ** Page Change Handler ** //
  const handleNextPage = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  // ** Page Change Handler ** //
  const handlePrevPage = () => {
    setOffset((prevOffset) => prevOffset - limit);
  };

  // ** Function to change the number of users per page ** //
  const handleLimitChange = (NewLimit: number) => {
    setLimit(NewLimit);
    setOffset(0);
  };

  return {
    limit,
    offset,
    handleNextPage,
    handlePrevPage,
    handleLimitChange,
  };
};
