import React, { useEffect, useRef, useCallback } from 'react';

const useClickOutside = (
  setIsComponentVisible: React.Dispatch<any>
): { ref: React.RefObject<HTMLDivElement> } => {
  const ref = useRef<HTMLDivElement>(null);

  const handleHideDropdown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsComponentVisible(false);
      }
    },
    [setIsComponentVisible]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref };
};

export default useClickOutside;
