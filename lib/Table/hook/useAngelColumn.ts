import { useState } from 'react';
import type { TColumn } from '../type';
type TAngelTableColumnOption = {
  columns: TColumn[];
};
export function useAngelColumn({ columns }: TAngelTableColumnOption) {
  const [showColumm, setShowColumm] = useState([
    ...columns.map((column) => {
      return { ...column, show: true };
    }),
  ]);

  return { setShowColumm, showColumm };
}
