import React from 'react';
import { NavLink } from 'react-router-dom';
import { EventType, buildRange } from '../ScheduleRange/buildRange';
import { useTypedSelector } from '../supports/Hooks';

interface TooltipProps {
  day: moment.Moment;
  maxLength: number;
}

const Tooltip: React.FC<TooltipProps> = ({ day, maxLength }) => {
  const {
    grid: { events },
    datePicker: { date },
  } = useTypedSelector((state) => state);

  const startOfRange = day.clone().startOf('day');
  const endOfRange = day.clone().add(1, 'day').startOf('day');
  const dayRange = buildRange(events, startOfRange, endOfRange)[0].day;

  return (
    <div className='tooltip datepicker__tooltip'>
      {dayRange.map(({ time, title }: EventType, idx: number) => {
        const start: string = time.clone().format('HH:mm');
        const end: string = time.clone().add(1, 'hour').format('HH:mm');

        if (idx >= maxLength) {
          return null;
        }

        return (
          <div key={idx} className={`tooltip__event`}>
            <div className='tooltip__time'>
              {start}
              &mdash;
              {end}
            </div>
            <div className='tooltip__circle'></div>
            <div className='tooltip__event-title'>
              <span className='tooltip__title-inner'>{title}</span>
            </div>
          </div>
        );
      })}

      {dayRange.length > maxLength && (
        <NavLink
          className='link tooltip__more'
          to={{
            pathname: `/day`,
            search: `date=${date.format('YYYY-MM-DD')}`,
          }}
        >
          Еще {dayRange.length - maxLength}...
        </NavLink>
      )}
    </div>
  );
};

export default Tooltip;
