import React from 'react';
import { useHistory } from 'react-router-dom';
import { useInput } from '../supports/hooks';

interface RadioBtnProps {
  defaultChecked: string;
  options: {
    value: string;
    text: string;
    href: { pathname: string; search?: string };
  }[];
  onLabelClick: (value: string) => void;
  name: string;
}

const RadioBtn: React.FC<RadioBtnProps> = ({
  defaultChecked,
  options,
  onLabelClick,
  name,
}) => {
  const input = useInput(defaultChecked);
  const history = useHistory();

  const handleChange = (href: { pathname: string; search?: string }) => (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    history.push({
      pathname: href.pathname,
      search: href.search,
    });

    input.onChange(event);
    onLabelClick(event.currentTarget.value);
  };

  return (
    <div className='radio-group'>
      {options.map(({ value, text, href }, idx) => (
        <div className='radio-group__option' key={idx}>
          <input
            className='radio-group__input visually-hidden'
            type='radio'
            id={value}
            name={name}
            value={value}
            defaultChecked={input.value === value}
            onChange={handleChange(href)}
          />
          <label className='radio-group__label' htmlFor={value}>
            {text}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioBtn;
