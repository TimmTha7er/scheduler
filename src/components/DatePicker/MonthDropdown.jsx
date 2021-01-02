import { useState } from 'react';

const monthsList = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

const MonthDropdown = ({ selectedMonth }) => {
  const [activeMonth, setActiveMonth] = useState(selectedMonth);

  const onMonthClick = (month) => () => {
    setActiveMonth(month);
  };

  return (
    <div className='datepicker__month-dropdown'>
      {monthsList.map((item, idx) => {
        const className =
          item === activeMonth
            ? 'datepicker__month-name datepicker__month-name_selected'
            : 'datepicker__month-name';
        return (
          <div onClick={onMonthClick(item)} key={idx} className={className}>
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default MonthDropdown;
