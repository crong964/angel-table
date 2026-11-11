import { useCallback, useEffect, useRef, useState } from 'react';

import { useAngelPagination } from './useAngelPagination';
import { useAngelFilterSerchSort } from './useAngelFilterSerchSort';
import { useAngelCheck } from './useAngelCheck';
import type { TAngelTableOption } from '../type';

function createFilter(filters: Record<string, string>) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '') {
      params.set(key, value);
    }
  });

  return params;
}

export function useAngelTable<T>({
  rows = [],
  setup = {},
}: TAngelTableOption<T>) {
  const {
    url = '',
    viewDefault = 'table',
    angelFetch,
    keyObject = 'id',
    is_select = false,
    selectedItem,
  } = setup;
  const [rowData, setRowData] = useState(rows);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState(viewDefault);

  const {
    data: { page, perPage, totalPage },
    handle: { setPage, setPerPage, setTotalPage },
  } = useAngelPagination();
  const {
    data: { debouncedSearch, filter, search, sort },
    handle: { handleSort, setFilter, setSearch, setSort, setDebouncedSearch },
  } = useAngelFilterSerchSort();

  const {
    data: { checkedId, selectedCount, checkAll },
    handle: { handleCheck, handleCheckAll, setCheckedId },
  } = useAngelCheck<T>({
    is_select,
    keyObject,
    rowData: rowData,
    selectedItem,
  });

  const targetRef = useRef<HTMLDivElement>(null);
  const targetTableRef = useRef<any>(null);
  const handleResetFilter = useCallback(() => {
    setFilter({});
    setPage(1);
    setSearch('');
    setDebouncedSearch('');
    setSort({
      direction: 'asc',
      field: '',
    });
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutSignal = AbortSignal.timeout(5000);
    const fetchData = async () => {
      setLoading(true);

      try {
        const params = createFilter(filter);
        params.set('page', String(page));
        params.set('perPage', String(perPage));

        if (debouncedSearch.trim() !== '') {
          params.set('search', debouncedSearch.trim());
        }

        if (sort.field) {
          params.set('field', sort.field);
          params.set('direction', sort.direction);
        }

        const separator = url.includes('?') ? '&' : '?';
        const angelUrl = `${url}${separator}${params.toString()}`;

        if (angelFetch) {
          let aglData = await angelFetch(angelUrl);
          setRowData(aglData.data ?? []);
          setTotalPage(Math.max(1, Number(aglData.totalPages ?? 1)));
          setCheckedId({});
        } else {
          const response = await fetch(angelUrl, {
            method: 'GET',
            signal: AbortSignal.any([controller.signal, timeoutSignal]),
          });

          if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
          }

          const result = await response.json();

          if (controller.signal.aborted) return;

          setRowData(result.data ?? []);
          setTotalPage(Math.max(1, Number(result.totalPages ?? 1)));
          setCheckedId({});
        }

        targetRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        targetTableRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') return;

        setRowData([]);
        setTotalPage(1);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (url === '' && !angelFetch) {
      setTotalPage(0);
      return;
    }
    fetchData();

    return () => controller.abort();
  }, [filter, page, perPage, url, debouncedSearch, sort]);

  return {
    data: {
      page,
      perPage,
      totalPage,
      debouncedSearch,
      filter,
      search,
      sort,
      checkedId,
      selectedCount,
      rowData,
      view,
      loading,
      targetRef,
      checkAll,
      targetTableRef,
    },
    handle: {
      setPage,
      setPerPage,
      setTotalPage,
      handleResetFilter,
      handleSort,
      setFilter,
      setSearch,
      setSort,
      handleCheck,
      handleCheckAll,
      setCheckedId,
      setRowData,
      setView,
    },
  };
}
