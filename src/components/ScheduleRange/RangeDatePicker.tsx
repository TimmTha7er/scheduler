import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setALLPopupsUnvisible } from '../../redux/actions';
import { useClickOutside } from '../supports/hooks';
import { DatePicker } from '..';

interface RangeDatePickerProps {
  setDateOfRange: (day: moment.Moment) => object;
  date: moment.Moment;
  isVisible: boolean;
  setVisible: (value: boolean) => object;
  position: string;
}

const RangeDatePicker: React.FC<RangeDatePickerProps> = ({
  setDateOfRange,
  date,
  isVisible,
  setVisible,
  position,
}) => {
  const dispatch = useDispatch();

  const onStartDateClick = (): void => {
    dispatch(setVisible(!isVisible));
    dispatch(setALLPopupsUnvisible());
  };

  const setRangeDate = useCallback(
    (date: moment.Moment) => dispatch(setDateOfRange(date)),
    [dispatch, setDateOfRange]
  );
  const setRabgeVisible = useCallback(
    (value: boolean) => dispatch(setVisible(value)),
    [dispatch, setVisible]
  );

  const leftDatePickerRef = useClickOutside(setRabgeVisible);

  return (
    <div ref={leftDatePickerRef} className='schedule-range__date-wrap'>
      <div
        onClick={onStartDateClick}
        className={`schedule-range__${position}-date`}
      >
        {date.format('DD-MM-YYYY')}
      </div>
      {isVisible && (
        <DatePicker
          owner={'schedule-range'}
          date={date}
          setDate={setRangeDate}
          setVisible={setRabgeVisible}
        ></DatePicker>
      )}
    </div>
  );
};

export default RangeDatePicker;
