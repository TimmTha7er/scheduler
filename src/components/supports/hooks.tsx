import React, { useEffect, useRef, useState } from 'react';

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

type IFormEvent = React.FormEvent<HTMLInputElement | HTMLTextAreaElement>;
interface IUseInput {
  value: string;
  onChange: (event: IFormEvent) => void;
}

export const useInput = (initialValue: string): IUseInput => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (event: IFormEvent): void => {
    setValue(event.currentTarget.value);
  };

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
