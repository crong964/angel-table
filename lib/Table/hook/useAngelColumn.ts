import { useState } from 'react';
import type { TColumn } from '../type';
type TAngelTableColumnOption<T> = {
  columns: TColumn<T>[];
};
export function useAngelColumn<T>({ columns }: TAngelTableColumnOption<T>) {
  const [showColumm, setShowColumm] = useState([
    ...columns.map((column) => {
      if (column.show === undefined) {
        return { ...column, show: true };
      }
      return { ...column };
    }),
  ]);

  return { setShowColumm, showColumm };
}
