'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';

import type { TAngelSortOption, TColumn } from '../type';

const AngelSort = <T,>({
  columns,
  field,
  sortDirection,
  onSort,
}: TAngelSortOption<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(field);
  const [selectedSortDirection, setSelectedSortDirection] = useState<
    'asc' | 'desc' | (string & {})
  >(sortDirection);

  const sortColumns = useMemo(() => {
    return columns.filter((columns) => columns.sort && columns.show);
  }, [columns]);
  useEffect(() => {
    setSelectedField(field);
    return () => {};
  }, [field]);
  return (
    <div
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
      data-direction={'bottom'}
      className={`angel-table__dropdown `}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='angel-table__button angel-table__button--secondary '
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          viewBox='0 0 16 16'
        >
          <path
            fillRule='evenodd'
            d='M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5'
          />
        </svg>
      </button>

      {isOpen && (
        <div className='angel-table__dropdown-menu'>
          {sortColumns.map((_) => (
            <button
              type='button'
              key={_.field}
              onClick={() => {
                if (
                  selectedSortDirection === 'asc' &&
                  _.field === selectedField
                ) {
                  return;
                }
                setSelectedField(_.field);
                setSelectedSortDirection('asc');
                if (onSort) {
                  onSort({
                    field: _.field,
                    sortDirection: 'asc',
                  });
                }
              }}
              className={`angel-table__dropdown-item angel-table__button ${selectedField === _.field ? 'active' : ''}`}
            >
              <p> {_.title}</p>
            </button>
          ))}
          <hr />
          {sortColumns
            .filter((column: TColumn<T>) => column.field === selectedField)
            .map((column: TColumn<T>) => {
              return (
                <Fragment key={column.field}>
                  <button
                    onClick={() => {
                      setSelectedSortDirection('asc');
                      if (onSort) {
                        onSort({
                          field: column.field,
                          sortDirection: 'asc',
                        });
                      }
                    }}
                    className={`angel-table__dropdown-item angel-table__button ${selectedSortDirection === 'asc' ? 'active' : ''}`}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-arrow-up'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5'
                      />
                    </svg>
                    <p>{column.sortLabel?.ascLabel ?? 'Ascending'}</p>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSortDirection('desc');
                      if (onSort) {
                        onSort({
                          field: column.field,
                          sortDirection: 'desc',
                        });
                      }
                    }}
                    className={`angel-table__dropdown-item angel-table__button ${selectedSortDirection === 'desc' ? 'active' : ''}`}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      viewBox='0 0 16 16'
                    >
                      <path
                        fillRule='evenodd'
                        d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1'
                      />
                    </svg>
                    <p>{column.sortLabel?.descLabel ?? 'Descending'}</p>
                  </button>
                </Fragment>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default AngelSort;
