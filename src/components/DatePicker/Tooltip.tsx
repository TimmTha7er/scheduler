import React from 'react';
import { EventType } from '../ScheduleRange/buildRange';

interface TooltipProps {
  day: EventType[];
}

const Tooltip: React.FC<TooltipProps> = ({ day }) => {
  return (
    <div className='tooltip datepicker__tooltip'>
      {day.map(({ time, title }: EventType, idx: number) => {
        const start: string = time.clone().format('HH:mm');
        const end: string = time.clone().add(1, 'hour').format('HH:mm');

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
    </div>
  );
};

export default Tooltip;
