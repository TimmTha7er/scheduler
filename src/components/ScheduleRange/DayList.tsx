import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { RangeType, DayOfRangeType } from './buildRange';
import { setPreviewPopupVisible, setRowDate } from '../../redux/actions';
import { EventList } from '../../components';

interface DayListProps {
  range: RangeType;
}

const DayList: React.FC<DayListProps> = ({ range }) => {
  const dispatch = useDispatch();
  const {
    grid: { rowDate },
    popups: { isPreviewPopupVisible },
  } = useSelector((state: RootState) => state);

  const onEventClick = useCallback(
    (time: moment.Moment) => () => {
      dispatch(setRowDate(time));
      dispatch(setPreviewPopupVisible(true));
    },
    [dispatch]
  );

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

            <EventList
              day={day}
              rowDate={rowDate}
              isPreviewPopupVisible={isPreviewPopupVisible}
              onEventClick={onEventClick}
            ></EventList>
          </div>
        );
      })}
    </div>
  );
};

export default DayList;
