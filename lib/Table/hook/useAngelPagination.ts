import { useState } from 'react';

type TAngelPaginationOption = {
  pageOption?: number;

  perPageOption?: number;
};
export function useAngelPagination({
  pageOption = 1,
  perPageOption = 10,
}: TAngelPaginationOption = {}) {
  const [page, setPage] = useState(pageOption);
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(perPageOption);

  return {
    data: { page, perPage, totalPage },
    handle: { setPage, setPerPage, setTotalPage },
  };
}
