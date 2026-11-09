'use client';

import { memo, useState } from 'react';
//@ts-ignore
import './index.css';
import type { TAngelSelectCheck } from '../type';



const AngelSelectCheck = ({
  options,
  onChange,
  direction = 'bottom',
}: TAngelSelectCheck) => {
  const [show, setShow] = useState(false);
  const [options2, setOption] = useState(options);
  return (
    <div
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setShow(false);
        }
      }}
      data-direction={direction}
      className={`angel-table__dropdown ${show ? 'is-open' : ''}`}
    >
      <button
        onClick={() => setShow(!show)}
        className='angel-table__button angel-table__button--secondary '
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          fill='currentColor'
          viewBox='0 0 16 16'
        >
          <path d='M2 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z' />
          <path d='M13 4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z' />
        </svg>
      </button>

      {show && (
        <div className='angel-table__dropdown-menu'>
          {options2.map((option, i) => (
            <button
              key={option.value}
              type='button'
              onClick={() => {
                const temp = options2.map((option, index) => ({
                  ...option,
                  show: index === i ? !option.show : option.show,
                }));

                if (temp.filter((option) => option.show).length > 1) {
                  onChange?.(i);
                  setOption(temp);
                }
              }}
              className='angel-table__dropdown-item angel-table__button'
            >
              {option.show ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='blue'
                  className=' selected'
                  viewBox='0 0 16 16'
                >
                  <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='not-selected'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16' />
                  <path d='m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05' />
                </svg>
              )}
              <p>{option.title}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(AngelSelectCheck);
