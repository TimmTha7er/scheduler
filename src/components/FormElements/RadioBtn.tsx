import React from 'react';
import { useInput } from '../supports/hooks';

interface RadioBtnProps {
  defaultChecked: string;
  options: { value: string; text: string }[];
  onLabelClick: any;
  name: string;
}

const RadioBtn: React.FC<RadioBtnProps> = ({
  defaultChecked,
  options,
  onLabelClick,
  name,
}) => {
	const input = useInput(defaultChecked);

	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    input.onChange(event);
		onLabelClick(event.currentTarget.value);
  };

  return (
    <div className='radio-group'>
      {options.map(({ value, text }, idx) => (
        <React.Fragment key={idx}>
          <input
            className='radio-group__input visually-hidden'
            type='radio'
            id={value}
            name={name}
            value={value}
            defaultChecked={input.value === value}
            onChange={handleChange}
          />
          <label key={idx} className='radio-group__label' htmlFor={value}>
            {text}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

export default RadioBtn;
