import { useCallback, useMemo, useState } from 'react';

type TAngelCheckOption<T> = {
  rowData: T[];
  keyObject: string;
  is_select: boolean;
  selectedItem: ((data: T[]) => void) | undefined;
};
export function useAngelCheck<T>({
  rowData,
  keyObject,
  is_select,
  selectedItem,
}: TAngelCheckOption<T>) {
  const [checkedId, setCheckedId] = useState<Record<string, boolean>>({});

  const { checkAll, selectedCount } = useMemo(() => {
    const selectedCount = rowData.filter(
      (row: any) => checkedId[String(row[keyObject])],
    ).length;

    if (is_select && selectedItem) {
      selectedItem(rowData);
      let ids = [];
      for (const key in checkedId) {
        ids.push(key);
      }
    }
    return {
      checkAll: rowData.length > 0 && selectedCount === rowData.length,
      selectedCount,
    };
  }, [checkedId, rowData, keyObject]);

  const handleCheckAll = useCallback(() => {
    let next: any = {};
    console.log(checkAll);

    rowData.forEach((row: any) => {
      next[String(row[keyObject])] = !checkAll;
    });
    setCheckedId(next);
  }, [rowData, keyObject, checkAll]);

  const handleCheck = useCallback((data: any) => {
    const id = String(data[keyObject]);

    setCheckedId((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  return {
    handle: { handleCheck, handleCheckAll, setCheckedId },
    data: { selectedCount, checkedId, checkAll },
  };
}
