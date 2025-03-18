import { Pagination } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

export const PaginationComponent = ({
  initPageNumber,
  initItemsPerPageCount,
  startIndex,
  endIndex,
  setStartIndex,
  setEndIndex,
  initTotalEntries,
  setParamsOnParent,
}) => {
  const [totalEntries, setTotalEntries] = useState(initTotalEntries);
  const [itemsPerPageCount, setItemsPerPageCount] = useState(
    initItemsPerPageCount
  );
  const [previousItemsPerCount, setPreviousItemsPerCount] = useState(
    initItemsPerPageCount
  );
  const [pageNumber, setPageNumber] = useState(initPageNumber);
  const [pageCount, setPageCount] = useState(0);

  // useEffect(() => {
  //   setTotalEntries(initTotalEntries);
  //   setItemsPerPageCount(initItemsPerPageCount);
  //   setPreviousItemsPerCount(initItemsPerPageCount);
  //   setPageNumber(initPageNumber);
  // }, []);

  useEffect(() => {
    setStartIndex(pageNumber * itemsPerPageCount - itemsPerPageCount + 1);
    setEndIndex(pageNumber * itemsPerPageCount);
  }, [pageNumber, itemsPerPageCount]);

  useEffect(() => {
    setTotalEntries(initTotalEntries);
  }, [initTotalEntries]);

  useEffect(() => {
    setPageCount(Math.ceil(totalEntries / itemsPerPageCount));
    setPageNumber((prevPageNumber) =>
      Math.ceil((prevPageNumber * previousItemsPerCount) / itemsPerPageCount)
    );
    setPreviousItemsPerCount(itemsPerPageCount);
  }, [itemsPerPageCount, totalEntries]);

  useEffect(() => {
    setParamsOnParent({
      page: pageNumber,
      itemsPerPageCount: itemsPerPageCount,
    });
  }, [pageNumber, itemsPerPageCount]);

  return (
    <div className="pagination flex !flex-row !items-center !justify-center">
      <div>
        <p>
          showing {pageNumber * itemsPerPageCount - itemsPerPageCount + 1} to
          {pageNumber * itemsPerPageCount} of {totalEntries} entries
        </p>
      </div>
      <div>
        <Pagination
          onChange={(event, page) => {
            setPageNumber(page);
          }}
          page={pageNumber}
          count={pageCount}
          shape="rounded"
        ></Pagination>
      </div>

      <div>
        <select
          value={itemsPerPageCount}
          onChange={(event) => setItemsPerPageCount(Number(event.target.value))}
        >
          <option value={5}>5/page</option>
          <option value={10}>10/page</option>
          <option value={15}>15/page</option>
        </select>
      </div>

      <div>
        <span> go to</span>
        <input
          onChange={(event) => {
            setPageNumber(
              Math.min(Math.max(Number(event.target.value), 1), pageCount)
            );
          }}
          type="number"
          style={{ width: "50px" }}
        ></input>
      </div>
    </div>
  );
};
