import React, { useState, useCallback } from 'react';

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
