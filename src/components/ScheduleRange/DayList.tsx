import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buildRange, RangeType, DayOfRangeType, EventType } from './buildRange';
import { setPreviewPopupVisible, setRowDate } from '../../redux/actions';
import { RootState } from '../../redux/reducers/index';

const DayList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    grid: { events, rowDate },
    range: { startOfRange, endOfRange },
    popups: { isPreviewPopupVisible },
  } = useSelector((state: RootState) => state);

  const range: RangeType = buildRange(events, startOfRange, endOfRange);

  const onEventClick = (time: moment.Moment) => () => {
    dispatch(setRowDate(time));
    dispatch(setPreviewPopupVisible(true));
  };

  return (
    <div className='schedule-range__day-list'>
      {range.map(({ day, time }: DayOfRangeType, idx: number) => {
        const dayOfMonth: string = time.clone().format('DD');
        const month: string = time.clone().format('LL').split(' ')[1];
        const year: string = time.clone().format('YYYY');
        const dayOfWeek: string = time.clone().format('dddd');

        return (
          <div key={idx} className='schedule-range__day'>
            <div className='schedule-range__date'>
              <span className='schedule-range__dayOfMonth'>{dayOfMonth}</span>
              <span className='schedule-range__month'>{month}</span>
              <span className='schedule-range__year'>{year}</span>
              <div className='schedule-range__dayOfWeek'>{dayOfWeek}</div>
            </div>
            <div className='schedule-range__event-list'>
              {day.map(({ time, title }: EventType, idx: number) => {
                const start: string = time.clone().format('HH:mm');
                const end: string = time.clone().add(1, 'hour').format('HH:mm');

                const selectedEvent: string =
                  time.isSame(rowDate) && isPreviewPopupVisible
                    ? 'daygrid__row_selected'
                    : '';

                return (
                  <div
                    onClick={onEventClick(time)}
                    key={idx}
                    className={`schedule-range__event ${selectedEvent}`}
                  >
                    <div className='schedule-range__time'>
                      {start}
                      &mdash;
                      {end}
                    </div>
                    <div className='schedule-range__circle'></div>
                    <div className='schedule-range__event-title'>
                      <span className='schedule-range__title-inner'>
                        {title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayList;
