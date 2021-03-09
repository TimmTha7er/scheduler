import React from 'react';
import { EventType } from './buildRange';

interface EventListProps {
  day: EventType[];
  rowDate: moment.Moment | null;
  isPreviewPopupVisible: boolean;
  onEventClick: (time: moment.Moment) => () => void;
}

const EventList: React.FC<EventListProps> = ({
  day,
  rowDate,
  isPreviewPopupVisible,
  onEventClick,
}) => {
  return (
    <div className='event-list'>
      {day.map(({ time, title }) => {
        const start: string = time.clone().format('HH:mm');
        const end: string = time.clone().add(1, 'hour').format('HH:mm');

        const selectedEvent: string =
          time.isSame(rowDate) && isPreviewPopupVisible
            ? 'daygrid__row_selected'
            : '';

        return (
          <div
            onClick={onEventClick(time)}
            key={`${start}-${end}`}
            className={`event-list__event ${selectedEvent}`}
          >
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

export default React.memo(EventList);
