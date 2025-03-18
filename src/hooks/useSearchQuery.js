import { useEffect, useState } from "react";

export const UseSearchQuery = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("1");
  const [count, setCount] = useState("10");
  const [orderBy, setOrderBy] = useState("");
  const [queryHolder, setQueryHolder] = useState([]);
  const [sort, setSort] = useState(1);

  useEffect(() => {
    // debugger
    let searchParams = "";

    searchParams +=
      queryHolder.length > 0
        ? queryHolder.reduce((accumalator, currentValue, index) => {
            if (index == 0) {
              return (accumalator += `${currentValue.field}=${currentValue.value}&`);
            } else {
              return (accumalator += `${currentValue.field}=${currentValue.value}&`);
            }
          }, "")
        : "";

    searchParams =
      orderBy && sort
        ? `${searchParams}orderBy=${orderBy}&sort=${sort}&`
        : searchParams;
    searchParams =
      page && count
        ? `${searchParams}page=${page}&count=${count}&`
        : searchParams;
    if (searchParams[searchParams.length - 1] == "&") {
      searchParams = searchParams.substring(0, searchParams.length - 1);
    }
    setSearch(searchParams);
  }, [orderBy, sort, queryHolder, page, count]);

  const addQueryField = (field, value) => {
    setQueryHolder((queryHolder) => [...queryHolder, { field, value }]);
  };

  const removeQueryFiled = (field) => {
    setQueryHolder((queryHolder) =>
      queryHolder.filter((item) => item.field !== field)
    );
  };

  const bindFormValue = (field, value) => {
    // debugger
    if (value === "") {
      removeQueryFiled(field);
    }

    if (
      value !== "" &&
      queryHolder.findIndex((item) => item.value == value) < 0
    ) {
      removeQueryFiled(field);
      addQueryField(field, value);
    }
  };

  const sortingOrder = (value) => {
    if (value == 1 || value == -1) {
      setSort(value);
    }
  };
  const setOrderByField = (field) => {
    setOrderBy(field);
  };

  return {
    search,
    bindFormValue,
    setOrderByField,
    sortingOrder,
    setCount,
    setPage,
  };
};
