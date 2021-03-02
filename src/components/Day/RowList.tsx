import React, { useEffect, useState } from 'react';
import { buildDayGrid } from './buildDayGrid';
import { ErrorIndicator, DayGridLoader } from '../../components';
import { useActions, useTypedSelector } from '../supports/Hooks';

const DayGrid: React.FC = () => {
  const {
    setCreatePopupVisible,
    setPreviewPopupVisible,
    setRowDate,
  } = useActions();
  const {
    datePicker: { date },
    popups: { isCreatePopupVisible, isPreviewPopupVisible },
    grid: { rowDate, events, loading, error },
  } = useTypedSelector((state) => state);
  const [dayGrid, setDayGrid] = useState<moment.Moment[]>([]);

  useEffect(() => {
    setDayGrid(buildDayGrid(date));
  }, [date, events]);

  const onRowClick = (time: moment.Moment) => (): void => {
    if (!isCreatePopupVisible && !isPreviewPopupVisible) {
      setRowDate(time);
      setCreatePopupVisible(true);
    }
  };

  const onEventClick = (time: moment.Moment) => (): void => {
    if (!isCreatePopupVisible) {
      setRowDate(time);
      setPreviewPopupVisible(true);
    }
  };

  if (error) {
    return <ErrorIndicator />;
  }

  if (loading) {
    return <DayGridLoader />;
  }

  return (
    <div className='daygrid__rows'>
      {dayGrid.map((time: moment.Moment, idx: number) => {
        const selectedRow: string = time.isSame(rowDate)
          ? 'daygrid__row_selected'
          : '';
        const selectedEvent: string = time.isSame(rowDate)
          ? 'grid-event_selected'
          : '';

        const row = events[time.toString()] ? (
          <div key={idx} className='daygrid__row'>
            <div
              onClick={onEventClick(time)}
              className={`grid-event ${selectedEvent}`}
            >
              <span className='grid-event__inner'>
                {events[time.toString()].title}
              </span>
            </div>
          </div>
        ) : (
          <div
            onClick={onRowClick(time)}
            key={idx}
            className={`daygrid__row ${selectedRow}`}
          ></div>
        );

        return row;
      })}
    </div>
  );
};

export default DayGrid;
