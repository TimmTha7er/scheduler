import { useState } from 'react';
// import moment from 'moment';
// const monthsList = [
//   'январь',
//   'февраль',
//   'март',
//   'апрель',
//   'май',
//   'июнь',
//   'июль',
//   'август',
//   'сентябрь',
//   'октябрь',
//   'ноябрь',
//   'декабрь',
// ];

const buildMonthsList = (value) => {
  const startMonth = value.clone().startOf('year');
  const endMonth = value.clone().endOf('year');

  const month = startMonth.clone().subtract(1, 'month');
  const monthsList = [];

  while (month.isBefore(endMonth, 'month')) {
    monthsList.push(month.add(1, 'month').clone());
  }

  return monthsList;
};

const MonthDropdown = ({ date, onChangeMonth }) => {
  const [activeMonth, setActiveMonth] = useState(date);
  const monthsList = buildMonthsList(date);

  const onMonthClick = (month) => () => {
    setActiveMonth(month);
    onChangeMonth(month);
  };

  return (
    <div className='datepicker__month-dropdown'>
      {monthsList.map((item, idx) => {
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

export default MonthDropdown;
