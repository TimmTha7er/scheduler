import React, { useEffect, useRef } from 'react';

type IUseFocus = React.RefObject<HTMLInputElement>;

export const useFocus = (): IUseFocus => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current!.focus();
  }, []);

  return ref;
};
