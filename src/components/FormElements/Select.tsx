import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useClickOutside, useQuery } from '../supports/hooks';

interface SelectProps {
  defaultSelected: string;
  options: string[];
  onOptionClick: React.Dispatch<string>;
}

const Select: React.FC<SelectProps> = ({
  options,
  onOptionClick,
  defaultSelected,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(defaultSelected);
  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const [optionsList, setOptionsList] = useState<string[]>(['']);
  const selectRef = useClickOutside(setShowOptionList);
  const active = showOptionList ? 'select_active' : '';

  const history = useHistory();
  const query = useQuery();
  const num = query.get('num') || '';
  const interval = query.get('interval') || '';

  useEffect(() => {
    setOptionsList(options);
    setSelectedOption(interval);
  }, [defaultSelected, interval, options]);

  const handleListDisplay = () => {
    setShowOptionList((prevState) => !prevState);
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const optionName = e.currentTarget.getAttribute('data-name') || '';

    history.push({
      search: `num=${num}&interval=${optionName}`,
    });

    setSelectedOption(optionName);
    setShowOptionList(false);
    onOptionClick(optionName);
  };

  return (
    <div ref={selectRef} className={`select ${active}`}>
      <div className={`select__selected-text`} onClick={handleListDisplay}>
        {selectedOption}
      </div>

      {showOptionList && (
        <ul className='select__options'>
          {optionsList.map((option, idx) => {
            const selected =
              selectedOption === option ? 'select__option_selected' : '';

            return (
              <li
                className={`select__option ${selected}`}
                data-name={option}
                key={idx}
                onClick={handleOptionClick}
              >
                {option}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default React.memo(Select);
