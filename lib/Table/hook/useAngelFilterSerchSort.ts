import { useCallback, useEffect, useState } from 'react';

export function useAngelFilterSerchSort() {
  const [filter, setFilter] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [sort, setSort] = useState<{
    field: string;
    direction: 'asc' | 'desc';
  }>({
    field: '',
    direction: 'asc',
  });

  const handleSort = useCallback((field: string) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return {
    data: {
      filter,
      search,
      debouncedSearch,
      sort,
    },
    handle: {
      setFilter,
      setSearch,
      setSort,
      setDebouncedSearch,
      handleSort,
    },
  };
}
