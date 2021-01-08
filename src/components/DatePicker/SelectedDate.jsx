import { useState, useRef, useEffect } from 'react';
import YearDropdown from './YearDropdown';
import MonthDropdown from './MonthDropdown';

const SelectedDate = ({ value, onChangeMonth, onChangeYear }) => {
  const [visibleMonthDropdown, setVisibleMonthDropdown] = useState(false);
  const [visibleYearDropdown, setVisibleYearDropdown] = useState(false);
  const monthRef = useRef();
  const yearRef = useRef();

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e) => {
    if (!e.path.includes(monthRef.current)) {
      setVisibleMonthDropdown(false);
    }
    if (!e.path.includes(yearRef.current)) {
      setVisibleYearDropdown(false);
    }
  };

  const onSelectedMonthClick = () => {
    setVisibleMonthDropdown((prevState) => !prevState);
  };

  const onSelectedYearClick = () => {
    setVisibleYearDropdown((prevState) => !prevState);
  };

  const currYear = () => {
    return value.format('YYYY');
  };

  const currMonthName = () => {
    return value.format('MMMM');
  };

  return (
    <div className='datepicker__selected-date'>
      <div ref={monthRef} className='datepicker__selected-month-wrap'>
        <span
          className='datepicker__selected-month'
          onClick={onSelectedMonthClick}
        >
          {currMonthName()}
        </span>

        {visibleMonthDropdown && (
          <MonthDropdown
            onChangeMonth={onChangeMonth}
            onSelectedMonthClick={onSelectedMonthClick}
            date={value}
          ></MonthDropdown>
        )}
      </div>
      <div ref={yearRef} className='datepicker__selected-year-wrap'>
        <span
          onClick={onSelectedYearClick}
          className='datepicker__selected-year'
        >
          {currYear()}
        </span>

        {visibleYearDropdown && (
          <YearDropdown
            onChangeYear={onChangeYear}
            onSelectedYearClick={onSelectedYearClick}
            date={value}
          ></YearDropdown>
        )}
      </div>
    </div>
  );
};

export default SelectedDate;
