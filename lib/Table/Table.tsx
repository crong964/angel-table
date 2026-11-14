'use client';
//@ts-ignore
import './index.css';
import { Fragment, useCallback, useMemo } from 'react';
import AngelSelect from './components/Select';
import AngelSelectCheck from './components/SelectCheck';
import { useAngelTable } from './hook/useAngelData';
import { useAngelColumn } from './hook/useAngelColumn';
import AngelSort from './components/Sort';
import type { TAngelTableOption } from './type';
import { useBreakpoint } from './hook/useBearekPoint';
import Panigation from './components/Panigation';

export const Table = <T,>(data: TAngelTableOption<T>) => {
  const { widthScreen } = useBreakpoint();
  const { columns, card, className, empty, perPages, selector, setup } =
    useMemo(() => {
      const {
        columns,
        card,
        className,
        empty,
        perPages = [10, 15, 20],
        rows,
        selector,
        setup = {},
      } = data;

      return {
        columns,
        card,
        className,
        empty,
        perPages,
        rows,
        selector,
        setup,
      };
    }, [data]);

  const {
    keyObject = 'id',
    contentPage = 'Page',
    mode = 'light',
    selectedRender = (count: number) => (
      <span>
        Selected: <strong>{count}</strong> items
      </span>
    ),
    is_select = false,
    showColumns,
    typePagination = 'simple',
  } = useMemo(() => setup, [setup]);

  const {
    data: {
      checkedId,
      filter,
      loading,
      page,
      perPage,
      rowData,
      search,
      selectedCount,
      sort,
      totalPage,
      view,
      checkAll,
      targetRef,
      targetTableRef,
    },
    handle: {
      handleCheck,
      handleCheckAll,
      handleResetFilter,
      handleSort,
      setCheckedId,
      setFilter,
      setPage,
      setPerPage,
      setSearch,
      setView,
    },
  } = useAngelTable(data);
  const { setShowColumm, showColumm } = useAngelColumn({ columns });

  const renderEmpty = useCallback(() => {
    if (empty) return empty.render();
    return (
      <div className='angel-table__empty'>
        <div className='angel-table__empty-icon'>
          <svg
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            aria-hidden='true'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-13Z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8 9h8M8 13h5m2 4 2 2 4-4'
            />
          </svg>
        </div>

        <h3 className='angel-table__empty-title'>No data found</h3>

        <p className='angel-table__empty-description'>
          No data available to display. Please try again later.
        </p>

        <button
          type='button'
          className='angel-table__button angel-table__button--secondary'
          onClick={() => setPage(1)}
        >
          Refresh
        </button>
      </div>
    );
  }, [empty]);

  const tableHeader = (
    <tr>
      {showColumm
        .filter((column) => column.show)
        .map((column) => {
          if (column.field === 'check_field' && is_select) {
            return (
              <th
                style={{ width: column.width }}
                key={column.field}
                className={`angel-table__check-cell ${column.className ?? ''}`}
              >
                <input
                  type='checkbox'
                  checked={checkAll}
                  onChange={handleCheckAll}
                  aria-label='Chọn tất cả'
                />
              </th>
            );
          }
          if (column.field === 'check_field' && !is_select) {
            return <></>;
          }
          if (column.field === 'action_field') {
            return (
              <th
                key={column.field}
                style={{ width: column.width }}
                className={`angel-table__index-cell ${column.className ?? ''}`}
              >
                {column.title}
              </th>
            );
          }
          if (column.field === 'index_field') {
            return (
              <th
                style={{ width: column.width }}
                onClick={() => {
                  if (column.sort) {
                    handleSort(column.field);
                  }
                }}
                key={column.field}
                className={`angel-table__index-cell ${column.className ?? ''}`}
              >
                <span className='angel-table__sort'>#</span>
              </th>
            );
          }

          return (
            <th
              style={{ width: column.width }}
              onClick={() => handleSort(column.field)}
              key={column.field}
              className={column.className ?? ''}
            >
              <span className='angel-table__sort'>
                {column.title}
                {column.sort && (
                  <span className='angel-table__sort-icon'>
                    {sort.field === column.field &&
                      sort.direction === 'asc' && (
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
                      )}

                    {sort.field === column.field &&
                      sort.direction === 'desc' && (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='16'
                          fill='currentColor'
                          className='bi bi-arrow-down'
                          viewBox='0 0 16 16'
                        >
                          <path
                            fillRule='evenodd'
                            d='M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1'
                          />
                        </svg>
                      )}

                    {sort.field !== column.field && (
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
                    )}
                  </span>
                )}
              </span>
            </th>
          );
        })}
    </tr>
  );

  return (
    <div
      data-theme={mode}
      ref={targetRef}
      className={`angel-table-container  ${className}`}
    >
      {/* Toolbar */}
      <div className='angel-table-toolbar'>
        <div className='angel-table__toolbar'>
          <div className='angel-table__toolbar-left'>
            {selector?.map((select) => (
              <AngelSelect
                value={filter[select.field]}
                key={select.field}
                {...select}
                onChange={(e) => {
                  setFilter((prev) => ({
                    ...prev,
                    [select.field]: e,
                  }));
                  setPage(1);
                }}
                direction='bottom'
              ></AngelSelect>
            ))}

            {/* Selection information */}
            {selectedCount > 0 && is_select && (
              <div className='angel-table__selection'>
                {selectedRender(selectedCount)}
                <button type='button' onClick={() => setCheckedId({})}>
                  Clear selection
                </button>
              </div>
            )}
          </div>
          <div className='angel-table__toolbar-left'>
            {showColumns && (
              <AngelSelectCheck
                onChange={(i) => {
                  const temp = showColumm.map((option, index) => ({
                    ...option,
                    show: index === i ? !option.show : option.show,
                  }));
                  setShowColumm([...temp]);
                }}
                options={[
                  ...showColumm.map((v) => {
                    return {
                      value: v.field,
                      title: v.title,
                      show: v.show == undefined ? true : v.show,
                    };
                  }),
                ]}
              />
            )}
            <AngelSort
              columns={showColumm}
              onSort={(s: any) => {
                handleSort(s.field);
              }}
              field={sort.field}
              sortDirection={sort.direction}
            />
            <button
              onClick={() => {
                if (view === 'table') {
                  setView('card');
                  return;
                }
                setView('table');
              }}
              className='angel-table__button angel-table__button--secondary'
            >
              {view === 'table' ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z' />
                  <path d='M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z' />
                </svg>
              )}
            </button>
            <div className='angel-table__search-box'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0' />{' '}
              </svg>
              <input
                type='text'
                name='angel-table__search'
                placeholder='Search...'
                value={search}
                onChange={(v) => {
                  setSearch(v.currentTarget.value);
                }}
              />
            </div>
            <button
              type='button'
              className='angel-table__button angel-table__button--secondary'
              onClick={handleResetFilter}
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
                  d='M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z'
                />
                <path d='M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466' />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className='angel-table-body '>
        {loading && (
          <>
            <div className='angel-table__loading-container'>
              <div className='angel-table__loading-backdrop'></div>

              <div className='angel-table__loading-overlay'>
                <div className='angel-table__loading-text'>Loading...</div>
              </div>
            </div>
          </>
        )}

        {/* Desktop table */}
        {widthScreen > 600 && view === 'table' ? (
          <div
            style={{ maxHeight: setup.heightTable ?? 600 }}
            className='angel-table '
          >
            <table ref={targetTableRef}>
              <thead>{tableHeader}</thead>
              <tbody>
                {rowData.length === 0 && !loading ? (
                  <tr className=''>
                    <td colSpan={columns.length}>{renderEmpty()}</td>
                  </tr>
                ) : (
                  rowData.map((data: any, index: number) => {
                    const id = String(data[keyObject]);

                    return (
                      <tr
                        key={id}
                        className={checkedId[id] ? 'is-selected' : ''}
                      >
                        {showColumm
                          .filter((column) => column.show)
                          .map((column) => {
                            if (column.field === 'action_field') {
                              return (
                                <td
                                  key={column.field}
                                  className={column.className ?? ''}
                                >
                                  {column.render ? column.render(data) : ''}
                                </td>
                              );
                            }
                            if (column.field === 'check_field' && is_select) {
                              return (
                                <td
                                  key={column.field}
                                  className={`angel-table__check-cell ${column.className ?? ''}`}
                                >
                                  <input
                                    type='checkbox'
                                    checked={!!checkedId[id]}
                                    onChange={() => handleCheck(data)}
                                    aria-label={`Chọn dòng ${id}`}
                                  />
                                </td>
                              );
                            }
                            if (column.field === 'check_field' && !is_select) {
                              return <></>;
                            }
                            if (column.field === 'index_field') {
                              return (
                                <td
                                  key={column.field}
                                  className={`angel-table__index-cell ${column.className ?? ''}`}
                                >
                                  {index + 1}
                                </td>
                              );
                            }

                            return (
                              <td
                                key={column.field}
                                className={column.className ?? ''}
                              >
                                {column.render
                                  ? column.render(data)
                                  : data[column.field]}
                              </td>
                            );
                          })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <Fragment>
            {rowData.length === 0 ? (
              renderEmpty()
            ) : (
              <ul className='angel-table__cards'>
                {rowData.map((row: any, index: number) => {
                  let id = row[keyObject];
                  return (
                    <Fragment key={id ?? index}>
                      {card ? (
                        card.render(row, () => handleCheck(row), checkedId[id])
                      ) : (
                        <li
                          onClick={() => {
                            handleCheck(row);
                          }}
                          className='angel-table__card '
                        >
                          {checkedId[id] && is_select && (
                            <span className='is-selected'>Selected</span>
                          )}
                          {showColumm
                            .filter((column) => column.show)
                            .map((column: any, columnIndex: number) => {
                              if (
                                ['check_field', 'index_field'].includes(
                                  column.field,
                                )
                              ) {
                                return null;
                              }
                              if (column.field === 'action_field') {
                                return (
                                  <div
                                    key={`${id ?? index}-${column.field ?? columnIndex}`}
                                  >
                                    {column.render ? column.render(row) : <></>}
                                  </div>
                                );
                              }
                              return (
                                <div
                                  key={`${id ?? index}-${column.field ?? columnIndex}`}
                                  className='angel-table__card_row'
                                >
                                  <span className='angel-table__card_column_left'>
                                    {column.title}
                                  </span>

                                  <span className='angel-table__card_column_right'>
                                    {column.render
                                      ? column.render(row)
                                      : row[column.field]}
                                  </span>
                                </div>
                              );
                            })}
                        </li>
                      )}
                    </Fragment>
                  );
                })}
              </ul>
            )}
          </Fragment>
        )}

        {/* Mobile cards */}
        {widthScreen <= 600 && (
          <Fragment>
            {rowData.length === 0 ? (
              renderEmpty()
            ) : (
              <div className='angel-table__cards'>
                {rowData.map((row: any, index: number) => {
                  const id = String(row[keyObject]);
                  {
                    checkedId[id] && (
                      <span className='is-selected'>Selected</span>
                    );
                  }
                  return (
                    <Fragment key={String(id ?? index)}>
                      {card ? (
                        card.render(row, () => handleCheck(row), checkedId[id])
                      ) : (
                        <div className='angel-table__card'>
                          {checkedId[id] && is_select && (
                            <span className='is-selected'>Selected</span>
                          )}
                          {showColumm
                            .filter((column) => column.show)
                            .map((column, columnIndex: number) => {
                              if (
                                ['check_field', 'index_field'].includes(
                                  column.field,
                                )
                              ) {
                                return null;
                              }
                              if (column.field === 'action_field') {
                                return (
                                  <div
                                    key={`${String(id ?? index)}-${column.field ?? columnIndex}`}
                                  >
                                    {column.render ? column.render(row) : <></>}
                                  </div>
                                );
                              }
                              return (
                                <div
                                  key={`${String(id ?? index)}-${column.field ?? columnIndex}`}
                                  className='angel-table__card_row'
                                >
                                  <span className='angel-table__card_column_left'>
                                    {column.title}
                                  </span>

                                  <span className='angel-table__card_column_right'>
                                    {column.render
                                      ? column.render(row)
                                      : row[column.field]}
                                  </span>
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            )}
          </Fragment>
        )}

        {/* Footer / Pagination */}

        {totalPage > 0 && (
          <Panigation
            onPerPage={function (perPage: number): void {
              setPerPage(Number(perPage));
              setPage(1);
            }}
            contentPage={contentPage}
            onPage={function (page: number): void {
              setPage(() => page);
            }}
            type={typePagination}
            perPages={perPages}
            perPage={perPage}
            page={page}
            loading={loading}
            totalPage={totalPage}
          />
        )}
      </div>
    </div>
  );
};
