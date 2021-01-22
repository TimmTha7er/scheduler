import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/ru';
import { buildCalendar } from './buildCalendar';
import { IEvent } from '../../redux/interfaces';

interface CalendarProps {
  value: moment.Moment;
  onDayClick: (day: moment.Moment) => () => void;
}

const Calendar: React.FC<CalendarProps> = ({ value, onDayClick }) => {
  const { events } = useSelector((state: RootState) => state.grid);
  const [calendar, setCalendar] = useState<moment.Moment[][]>([]);
  const today: moment.Moment = moment();

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  const isDayHasEvents = (value: moment.Moment, events: IEvent) => {
    const startOfDay: moment.Moment = value.clone().startOf('day');
    const endOfDay: moment.Moment = value.clone().add(1, 'day').startOf('day');
  
    while (startOfDay.isBefore(endOfDay, 'hour')) {
      if (events[startOfDay.toString()]) {
        return true;
      }
  
      startOfDay.add(1, 'hour');
    }
  
    return false;
  };

  return (
    <div className='datepicker__month'>
      {calendar.map((week: moment.Moment[], idx: number) => (
        <div key={idx} className='datepicker__week'>
          {week.map((day: moment.Moment, idx: number) => {
            const className: string = classNames({
              'datepicker__day_selected': value.isSame(day, 'day'),
              'datepicker__day_today': day.isSame(today, 'day'),
              'datepicker__day_weekend':
                day.format('dd') === 'вс' || day.format('dd') === 'сб',
              'datepicker__day_outside-month':
                day.isAfter(value, 'month') || day.isBefore(value, 'month'),
              'datepicker__day_has-events': isDayHasEvents(day, events),
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

export default React.memo(Calendar);
// export default React.memo(Calendar, (prev, next) => {
//   console.log('prev', prev.value.format());
//   console.log('next', next.value.format());
//   console.log('===', prev.value.format() === next.value.format());
//   return prev.value.format() === next.value.format();
// });

// export default Calendar;
