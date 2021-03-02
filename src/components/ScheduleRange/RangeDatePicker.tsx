import React, { useCallback } from 'react';
import { useActions, useClickOutside } from '../supports/Hooks/';
import { DatePicker } from '../../components';

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
  const { setALLPopupsUnvisible } = useActions();
  const onDateClick = (): void => {
    setVisible(!isVisible);
    setALLPopupsUnvisible();
  };

  const setRangeDate = useCallback(
    (date: moment.Moment) => setDateOfRange(date),
    [setDateOfRange]
  );

  const setRabgeVisible = useCallback((value: boolean) => setVisible(value), [
    setVisible,
  ]);

  const datePickerRef = useClickOutside(setRabgeVisible);

  return (
    <div ref={datePickerRef} className='schedule-range__date-wrap'>
      <div onClick={onDateClick} className={`schedule-range__${position}-date`}>
        {date.format('DD-MM-YYYY')}
      </div>
      {isVisible && (
        <DatePicker
          className={'schedule-range__datepicker'}
          date={date}
          setDate={setRangeDate}
          setVisible={setRabgeVisible}
        ></DatePicker>
      )}
    </div>
  );
};

export default RangeDatePicker;
