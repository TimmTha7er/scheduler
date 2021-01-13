import React, { useState, useCallback } from 'react';
import { YearDropdown, MonthDropdown } from '../../components';
import useClickOutside from '../supports/hooks';

interface SelectedDateProps {
  value: moment.Moment;
  onChangeMonth: (month: moment.Moment) => void;
  onChangeYear: (year: moment.Moment) => void;
}

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

  const { ref: monthRef } = useClickOutside(setVisibleMonthDropdown);
  const { ref: yearRef } = useClickOutside(setVisibleYearDropdown);

  const currYear = value.format('YYYY');
  const currMonthName = value.format('MMMM');

  const onSelectedMonthClick = useCallback(
    () => setVisibleMonthDropdown((prevState) => !prevState),
    []
  );

  const onSelectedYearClick = useCallback(
    () => setVisibleYearDropdown((prevState) => !prevState),
    []
  );

  return (
    <div className='datepicker__selected-date'>
      <div ref={monthRef} className='datepicker__selected-month-wrap'>
        <span
          className='datepicker__selected-month'
          onClick={onSelectedMonthClick}
        >
          {currMonthName}
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
          {currYear}
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
export default React.memo(SelectedDate);
// export default SelectedDate
