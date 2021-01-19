import React, { useState, useEffect } from 'react';
import { buildMonthsList } from './buildMonthsList';

interface MonthDropdownProps {
  date: moment.Moment;
  onChangeMonth: (month: moment.Moment) => void;
  onSelectedMonthClick: () => void;
}

const MonthDropdown: React.FC<MonthDropdownProps> = ({
  date,
  onChangeMonth,
  onSelectedMonthClick,
}) => {
  const [activeMonth, setActiveMonth] = useState<moment.Moment>(date);
  const [monthsList, setmonthsList] = useState<moment.Moment[]>([]);

  useEffect(() => {
    setmonthsList(buildMonthsList(date));
  }, []);

  const onMonthClick = (month: moment.Moment) => () => {
    setActiveMonth(month);
    onChangeMonth(month);
    onSelectedMonthClick();
  };

  return (
    <div className='datepicker__month-dropdown'>
      {monthsList.map((item: moment.Moment, idx: number) => {
        const className = item.isSame(activeMonth, 'month')
          ? 'datepicker__month-name datepicker__month-name_selected'
          : 'datepicker__month-name';
        return (
          <div onClick={onMonthClick(item)} key={idx} className={className}>
            {item.format('MMMM')}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(MonthDropdown);
// export default MonthDropdown;