import React, { useEffect, useRef } from 'react';

const useClickOutside = (
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

export default useClickOutside;
