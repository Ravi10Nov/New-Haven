import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";

export const PaginationComponent = ({
  initTotalEntries,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  rows,
}) => {
  const [totalEntries, setTotalEntries] = useState(initTotalEntries);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setTotalEntries(initTotalEntries);
  }, [initTotalEntries]);

  useEffect(() => {
    setPageCount(Math.ceil(totalEntries / itemsPerPage));
  }, [totalEntries, itemsPerPage]);

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = Number(event.target.value);
    onItemsPerPageChange(newItemsPerPage);
  };

  return (
    <div className="pagination flex !flex-row !items-center !justify-center">
      <div>
        <p>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalEntries)} of {totalEntries}{" "}
          entries
        </p>
      </div>
      <div>
        <Pagination
          onChange={handlePageChange}
          page={currentPage}
          count={pageCount}
          shape="rounded"
        />
      </div>
      <div>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value={5}>5/page</option>
          <option value={10}>10/page</option>
          <option value={15}>15/page</option>
        </select>
      </div>
    </div>
  );
};
