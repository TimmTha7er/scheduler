import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleRangeVisible } from '../../redux/actions';
import { EventType, buildRange } from '../ScheduleRange/buildRange';

interface TooltipProps {
  day: moment.Moment;
  maxLength: number;
}

const Tooltip: React.FC<TooltipProps> = ({ day, maxLength }) => {
  const dispatch = useDispatch();
  const {
    grid: { events },
    range: { isRangeVisible },
  } = useSelector((state: RootState) => state);

  const startOfRange = day.clone().startOf('day');
  const endOfRange = day.clone().add(1, 'day').startOf('day');
  const dayRange = buildRange(events, startOfRange, endOfRange)[0].day;

  const onMoreClick = () => {
    if (isRangeVisible) {
      dispatch(toggleRangeVisible());
    }
  };

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
        <div onClick={onMoreClick} className='tooltip__more'>
          Еще {dayRange.length - maxLength}...
        </div>
      )}
    </div>
  );
};

export default Tooltip;
