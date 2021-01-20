import React, { useEffect, useRef, useState } from 'react';

export const useClickOutside = (
  setIsComponentVisible: React.Dispatch<any>
): { ref: React.RefObject<HTMLDivElement> } => {
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

  return { ref };
};

interface IUseInput {
  value: string;
  onChange: any;
}

export const useInput = (initialValue: string): IUseInput => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setValue(event.currentTarget.value);
  };

  return {
    value,
    onChange,
  };
};

export const useFocus = (): React.RefObject<HTMLInputElement> => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current!.focus();
  }, []);

  return ref;
};
