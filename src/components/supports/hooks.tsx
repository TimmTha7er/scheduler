import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

type IUseClickOutside = React.RefObject<HTMLDivElement>;

export const useClickOutside = (
  setIsComponentVisible: React.Dispatch<boolean>
): IUseClickOutside => {
  const ref = useRef<HTMLDivElement>(null);

  const handleHideDropdown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (ref.current && !ref.current.contains(target as HTMLDivElement)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return ref;
};

interface IUseInput {
  value: string;
  onChange: (value: string) => void;
}

export const useInput = (
  initialValue: string,
  maxLength?: number,
  pattern?: RegExp
): IUseInput => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = useCallback(
    (value: string): void => {
      if (!(maxLength !== undefined && value.length > maxLength)) {
        if (pattern === undefined) {
          setValue(value);
        } else if (value === '' || pattern.test(value)) {
          setValue(value);
        }
      }
    },
    [maxLength, pattern]
  );

  return {
    value,
    onChange,
  };
};

type IUseFocus = React.RefObject<HTMLInputElement>;

export const useFocus = (): IUseFocus => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current!.focus();
  }, []);

  return ref;
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
