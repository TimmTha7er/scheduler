import React from 'react';
import { EventType } from '../ScheduleRange/buildRange';

interface EventListProps {
  day: EventType[];
}

const EventList: React.FC<EventListProps> = ({ day }) => {
  return (
    <div className='event-list datepicker__event-list'>
      {day.map(({ time, title }: EventType, idx: number) => {
        const start: string = time.clone().format('HH:mm');
        const end: string = time.clone().add(1, 'hour').format('HH:mm');

        return (
          <div key={idx} className={`event-list__event`}>
            <div className='event-list__time'>
              {start}
              &mdash;
              {end}
            </div>
            <div className='event-list__circle'></div>
            <div className='event-list__event-title'>
              <span className='event-list__title-inner'>{title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
