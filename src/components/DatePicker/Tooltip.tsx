import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { EventType, buildRange } from '../ScheduleRange/buildRange';

interface TooltipProps {
  day: moment.Moment;
  maxLength: number;
}

const Tooltip: React.FC<TooltipProps> = ({ day, maxLength }) => {
  const { events } = useSelector((state: RootState) => state.grid);
  const dayRange = buildRange(events, day, day)[0].day;

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

      {dayRange.length >= maxLength && (
        <div className='tooltip__more'>Еще {dayRange.length - maxLength}...</div>
      )}
    </div>
  );
};

export default Tooltip;
