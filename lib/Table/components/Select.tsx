'use client';
import { useEffect, useState } from 'react';
//@ts-ignore
import './index.css';
import type { TAngelSelect } from '../type';

const AngelSelect = ({
  value = '',
  options,
  noLabel = false,
  title,
  onChange,
  direction = 'bottom',
}: TAngelSelect) => {
  const [show, setShow] = useState(false);
  const [title2, setTitle] = useState(title);
  const [value2, setValue] = useState(value);
  useEffect(() => {
    if (value === undefined || value === '') {
      setTitle(title);
    }
  }, [value]);

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
        className='angel-table__button angel-table__button--secondary angel-table__dropdown-trigger'
      >
        <span>{title2}</span>

        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='10'
          height='10'
          fill='currentColor'
          viewBox='0 0 16 16'
          className='angel-table__dropdown-arrow'
        >
          <path
            fillRule='evenodd'
            d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708'
          />
        </svg>
      </button>

      {show && (
        <div className='angel-table__dropdown-menu'>
          {!noLabel && (
            <button
              type='button'
              onClick={() => {
                setValue('');
                setTitle(title);
                if (onChange) {
                  onChange('');
                }
                setShow(false);
              }}
              className={`angel-table__dropdown-item ${'' === value2 ? 'active' : ''}`}
            >
              {title}
            </button>
          )}
          {options.map((_) => (
            <button
              key={_.value}
              type='button'
              onClick={() => {
                setValue(_.value + '');
                setTitle(_.title);
                if (onChange) {
                  onChange(_.value);
                }
                setShow(false);
              }}
              className={`angel-table__dropdown-item ${_.value + '' === value2 ? 'active' : ''}`}
            >
              {_.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AngelSelect;
