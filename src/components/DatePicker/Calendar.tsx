import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/ru';
import { buildCalendar } from './buildCalendar';

type CalendarProps = {
  value: moment.Moment;
  onDayClick: (day: moment.Moment) => () => void;
};

const Calendar: React.FC<CalendarProps> = ({ value, onDayClick }) => {
  const [calendar, setCalendar] = useState<moment.Moment[][]>([]);
  const today: moment.Moment = moment();

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <div className='datepicker__month'>
      {calendar.map((week: moment.Moment[], idx: number) => (
        <div key={idx} className='datepicker__week'>
          {week.map((day: moment.Moment, idx: number) => {
            const className: string = classNames({
              datepicker__day_selected: value.isSame(day, 'day'),
              datepicker__day_today: day.isSame(today, 'day'),
              datepicker__day_weekend:
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
