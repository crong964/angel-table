import { memo, useMemo, type ReactNode } from 'react';
import type { TAngelPaginationOption } from '../type';
import AngelSelect from './Select';

const AngelPanigation = ({
  onPage,
  onPerPage,
  perPages,
  perPage,
  page,
  loading,
  totalPage,
  contentPage,
  type = 'simple',
}: TAngelPaginationOption) => {
  const Panigation = useMemo(() => {
    if (type == 'simple') {
      return <span className='angel-table__page-number'>{page}</span>;
    }

    let margin = 2;
    let tot = margin * 2;
    let panigation: ReactNode[] = [];
    for (let index = page - 1; index > 0 && page - index <= margin; index--) {
      tot -= 1;
      panigation.push(
        <button
          key={index}
          type='button'
          className='angel-table__button angel-table__button--secondary'
          onClick={() => onPage(index)}
          aria-label={`page ${index}`}
        >
          {index}
        </button>,
      );
    }
    panigation = panigation.reverse();
    panigation.push(<span className='angel-table__page-number'>{page}</span>);
    for (let index = page + 1; index <= totalPage && tot > 0; index++) {
      tot -= 1;

      panigation.push(
        <button
          type='button'
          key={index}
          className='angel-table__button angel-table__button--secondary'
          onClick={() => onPage(index)}
          aria-label={`page ${index}`}
        >
          {index}
        </button>,
      );
    }
    return panigation;
  }, [type, page, totalPage, loading]);
  return (
    <div className='angel-table__footer'>
      <div className='angel-table__footer-info'>
        {loading ? (
          'Đang tải...'
        ) : (
          <>
            {contentPage} <strong>{page}</strong> / <strong>{totalPage}</strong>
          </>
        )}
      </div>
      <div className='angel-table__pagination'>
        <AngelSelect
          field=''
          onChange={(e) => {
            onPerPage(Number(e));
            onPage(1);
          }}
          noLabel
          direction='top'
          options={[
            ...perPages.map((perPage) => {
              return { title: perPage + '', value: perPage + '' };
            }),
          ]}
          title={perPage + ''}
        />
        <div>
          <button
            type='button'
            className='angel-table__page-button'
            disabled={page <= 1 || loading}
            onClick={() => onPage(1)}
            aria-label='Trang trước'
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
                d='M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0'
              />
              <path
                fillRule='evenodd'
                d='M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0'
              />
            </svg>
          </button>
          <button
            type='button'
            className='angel-table__page-button'
            disabled={page <= 1 || loading}
            onClick={() => onPage(page - 1)}
            aria-label='Trang trước'
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
                d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0'
              />
            </svg>
          </button>

          {Panigation}

          <button
            type='button'
            className='angel-table__page-button'
            disabled={page >= totalPage || loading}
            onClick={() => onPage(page + 1)}
            aria-label='Trang tiếp theo'
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
                d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708'
              />
            </svg>
          </button>
          <button
            type='button'
            className='angel-table__page-button'
            disabled={page >= totalPage || loading}
            onClick={() => onPage(totalPage)}
            aria-label='Trang tiếp theo'
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
                d='M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708'
              />
              <path
                fillRule='evenodd'
                d='M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(AngelPanigation);
