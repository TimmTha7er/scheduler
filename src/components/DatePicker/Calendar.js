import { useState, useEffect } from "react";
import classNames from 'classnames';

const buildCalendar = (value) => {
  const startDay = value.clone().startOf('month').startOf('week');
  // const endDay = value.clone().endOf('month').endOf('week');
  const endDay = startDay.clone().add(5, 'week');

  const day = startDay.clone().subtract(1, 'day');
  const calendar = [];

  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  return calendar;
};

const Calendar = ({value, onDayClick}) => {
	const [calendar, setCalendar] = useState([]);
	// const [value, setValue] = useState(date);
	const today = new Date();

	useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <div className='datepicker__month'>
      {calendar.map((week, idx) => (
        <div key={idx} className='datepicker__week'>
          {week.map((day, idx) => {
            const className = classNames({
              'datepicker__day_selected': value.isSame(day),
              'datepicker__day_today': day.isSame(today, 'day'),
              'datepicker__day_weekend':
                day.format('dd') === 'вс' || day.format('dd') === 'сб',
              'datepicker__day_outside-month':
                day.isAfter(value, 'month') || day.isBefore(value, 'month'),
            });

            return (
              <div
                onClick={onDayClick(day)}
                key={idx}
                className={`datepicker__day ${className}`}
              >
                {day.format('D')}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
