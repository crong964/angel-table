import type { ReactNode } from 'react';

export type TAngelTableOption<T> = {
  columns: TColumn[];
  perPages?: number[];
  rows?: T[];
  card?: TCard<T>;
  empty?: TEmpty;
  className?: string;
  selector?: TAngelSelect[];
  setup?: {
    heightTable?: number;
    keyObject?: string;
    showColumns?: boolean;
    url?: string;
    typePagination?: 'numbered' | 'simple';
    viewDefault?: 'table' | 'card';
    is_select?: boolean;
    contentPage?: string;
    contentSearch?: string;
    mode?: 'light' | 'dark';
    selectedRender?: (count: number) => ReactNode;
    loadingRender?: () => ReactNode;
    selectedItem?: (data: T[]) => void;
    angelFetch?: (angelUrl: string) => Promise<{
      totalPages: number;
      data: T[];
      curPage: number;
    }>;
  };
};

export type TFilter = {
  field: string;
  value: string;
};
export type TEmpty = {
  render: () => ReactNode;
};
export type TColumn = {
  title: string;
  className?: string;
  field: 'check_field' | 'index_field' | 'action_field' | (string & {});
  render?: (row: any) => ReactNode;
  width?: string;
  sort?: boolean;
  sortLabel?: {
    ascLabel?: string;
    descLabel?: string;
  };
  show?: boolean;
};
export type TCard<T> = {
  render: (row: T, onCheck: () => void, checked: boolean) => ReactNode;
};

export type TAngelOption = {
  value: string;
  title: string;
};
export type TAngelSelect = {
  field: string;
  title: string;
  value?: string;
  direction?: 'top' | 'left' | 'right' | 'bottom';
  noLabel?: boolean;
  onChange?: (e: string) => void;
  options: TAngelOption[];
};
export type TAngelSelectCheck = {
  onChange?: (index: number) => void;
  options: { value: string; title: string; show: boolean }[];
  direction?: 'top' | 'left' | 'right' | 'bottom';
};

export type TAngelSortOption = {
  columns: TColumn[];
  field: string;
  sortDirection: string;
  onSort?: (d: { field: string; sortDirection: 'asc' | 'desc' }) => void;
};
export type TAngelPaginationOption = {
  onPerPage: (perPage: number) => void;
  onPage: (page: number) => void;
  perPages: number[];
  perPage: number;
  page: number;
  loading: boolean;
  totalPage: number;
  contentPage: string;
  type?: 'numbered' | 'simple';
};
