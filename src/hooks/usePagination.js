
import { useState } from "react";

export const usePagination = (list, perPage) => {
  const [cur, setCur] = useState(0);
  const pages = Math.ceil(list.length / perPage);
  const data = list.slice(cur * perPage, cur * perPage + perPage);
  const handleChangePage = (event, value) => {
    setCur(value - 1);
  };
  console.log(cur);
  return {
    pages,
    data,
    handleChangePage,
    currentPage: cur,
  };
};
