import React, { useState, useRef, useEffect } from 'react';
import YearDropdown from './YearDropdown';
import MonthDropdown from './MonthDropdown';

type SelectedDateProps = {
  value: moment.Moment;
  onChangeMonth: (month: moment.Moment) => void;
  onChangeYear: (year: moment.Moment) => void;
};

const SelectedDate: React.FC<SelectedDateProps> = ({
  value,
  onChangeMonth,
  onChangeYear,
}) => {
  const [visibleMonthDropdown, setVisibleMonthDropdown] = useState<boolean>(
    false
  );
  const [visibleYearDropdown, setVisibleYearDropdown] = useState<boolean>(
    false
  );
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e: any): void => {
    if (e.path && !e.path.includes(monthRef.current)) {
      setVisibleMonthDropdown(false);
    }
    if (e.path && !e.path.includes(yearRef.current)) {
      setVisibleYearDropdown(false);
    }
    // if (!monthRef.current?.contains(e.target)) {
    //   setVisibleMonthDropdown(false);
    // }
    // if (!yearRef.current?.contains(e.target)) {
    //   setVisibleYearDropdown(false);
    // }
  };

  const onSelectedMonthClick = (): void => {
    setVisibleMonthDropdown((prevState) => !prevState);
  };

  const onSelectedYearClick = (): void => {
    setVisibleYearDropdown((prevState) => !prevState);
  };

  const currYear = (): string => {
    return value.format('YYYY');
  };

  const currMonthName = (): string => {
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
