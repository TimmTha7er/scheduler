import React from 'react';
import { EventType } from './buildRange';

interface AdminEventListProps {
  day: EventType[];
  // rowDate: moment.Moment | null;
  // isPreviewPopupVisible: boolean;
  // onEventClick: (time: moment.Moment) => () => void;
}

const AdminEventList: React.FC<AdminEventListProps> = ({
  day,
  // rowDate,
  // isPreviewPopupVisible,
  // onEventClick,
}) => {
  return (
    <div className='admin-event-list'>
      {day.map(({ time, title, descr }: EventType, idx: number) => {
        const start: string = time.clone().format('HH:mm');
        const end: string = time.clone().add(1, 'hour').format('HH:mm');

        // const selectedEvent: string =
        //   time.isSame(rowDate) && isPreviewPopupVisible
        //     ? 'daygrid__row_selected'
        //     : '';

        console.log('descr', descr.split('\n'));

        return (
          <div
            // onClick={onEventClick(time)}
            key={idx}
            className={`admin-event-list__event`}
          >
            <div className='admin-event-list__head'>
              <div className='admin-event-list__time'>
                {start}
                &mdash;
                {end}
              </div>
              <div className='admin-event-list__circle'></div>
              <div className='admin-event-list__event-title'>
                <span className='admin-event-list__title-inner'>{title}</span>
              </div>
            </div>
            <div className='admin-event-list__event-descr'>
              {descr.split('\n').map((item: string, idx: number) => {
                return (
                  <span className='admin-event-list__descr-item' key={idx}>
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(AdminEventList);
