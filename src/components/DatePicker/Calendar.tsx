import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/ru';
import { Tooltip } from '../../components';
import { buildCalendar } from './buildCalendar';
import { isDayHasEvents } from './isDayHasEvents';
import { useTypedSelector } from '../supports/Hooks';

interface CalendarProps {
  value: moment.Moment;
  onDayClick: (day: moment.Moment) => () => void;
}

const Calendar: React.FC<CalendarProps> = ({ value, onDayClick }) => {
  const { events } = useTypedSelector((state) => state.grid);
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
            const dayHasEvents = isDayHasEvents(day, events);
            const className: string = classNames({
              datepicker__day_selected: value.isSame(day, 'day'),
              datepicker__day_today: day.isSame(today, 'day'),
              datepicker__day_weekend:
                day.format('dd') === 'вс' || day.format('dd') === 'сб',
              'datepicker__day_outside-month':
                day.isAfter(value, 'month') || day.isBefore(value, 'month'),
              'datepicker__day_has-events': dayHasEvents,
            });

            const tooltip = dayHasEvents ? (
              <Tooltip day={day} maxLength={5} />
            ) : null;

            return (
              <div
                onClick={onDayClick(day)}
                key={idx}
                className={`datepicker__day ${className}`}
              >
                {day.format('D')}
                {tooltip}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default React.memo(Calendar);
