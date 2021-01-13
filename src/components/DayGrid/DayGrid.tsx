import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCreatePopupVisible,
  setPreviewPopupVisible,
  setRowDate,
} from '../../redux/actions';
import { buildDayGrid } from './buildDayGrid';
import { RootState } from '../../redux/store';

const DayGrid: React.FC = () => {
  const dispatch = useDispatch();
  const {
    datePicker: { date },
    popups: { isCreatePopupVisible, isPreviewPopupVisible },
    grid: { rowDate, events },
  } = useSelector((state: RootState) => state);
  const [dayGrid, setDayGrid] = useState<moment.Moment[]>([]);

  useEffect(() => {
    setDayGrid(buildDayGrid(date));
  }, [date]);
  // const dayGrid: moment.Moment[] = useMemo(() => buildDayGrid(date), [date]);

  const selectedMonthDay: string = date.format('D');
  const selectedWeedDay: string = date.format('ddd');

  const onRowClick = (time: moment.Moment) => (): void => {
    if (!isCreatePopupVisible && !isPreviewPopupVisible) {
      dispatch(setRowDate(time));
      dispatch(setCreatePopupVisible(true));
    }
  };

  const onEventClick = (time: moment.Moment) => (): void => {
    if (!isCreatePopupVisible) {
      dispatch(setRowDate(time));
      dispatch(setPreviewPopupVisible(true));
    }
  };

  return (
    <div className='daygrid'>
      <div className='daygrid__header'>
        <div className='daygrid__date-wrap'>
          <div className='daygrid__date'>
            <div className='daygrid__month-day'>{selectedMonthDay}</div>
            <div className='daygrid__week-day'>{selectedWeedDay}</div>
          </div>

          <div className='daygrid__empty-row'></div>
        </div>
      </div>

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
    </div>
  );
};

export default DayGrid;
