import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setStartOFRange,
  setEndOFRange,
  setLeftDatePickerVisible,
  setRightDatePickerVisible,
  setALLPopupsUnvisible,
} from '../../redux/actions';
import { DatePicker, DayList } from '../../components';
import { RootState } from '../../redux/store';
import { useClickOutside } from '../supports/hooks';

const ScheduleRange: React.FC = () => {
  const dispatch = useDispatch();
  const {
    startOfRange,
    endOfRange,
    isLeftDatePickerVisible,
    isRightDatePickerVisible,
  } = useSelector((state: RootState) => state.range);

  const onStartDateClick = (): void => {
    dispatch(setRightDatePickerVisible(false));
    dispatch(setLeftDatePickerVisible(!isLeftDatePickerVisible));
    dispatch(setALLPopupsUnvisible());
  };

  const onEndDateClick = (): void => {
    dispatch(setLeftDatePickerVisible(false));
    dispatch(setRightDatePickerVisible(!isRightDatePickerVisible));
    dispatch(setALLPopupsUnvisible());
  };

  const setStartDate = useCallback(
    (date: moment.Moment) => dispatch(setStartOFRange(date)),
    [dispatch]
  );
  const setStartVisible = useCallback(
    (value: boolean) => dispatch(setLeftDatePickerVisible(value)),
    [dispatch]
  );
  const setEndDate = useCallback(
    (date: moment.Moment) => dispatch(setEndOFRange(date)),
    [dispatch]
  );
  const setEndVisible = useCallback(
    (value: boolean) => dispatch(setRightDatePickerVisible(value)),
    [dispatch]
  );

  const { ref: leftDatePickerRef } = useClickOutside(setStartVisible);
  const { ref: rightDatePickerRef } = useClickOutside(setEndVisible);

  return (
    <div className='schedule-range'>
      {/* <form className='schedule-range__date-range'> */}
      <div className='schedule-range__range-wrap'>
        <div className='schedule-range__label'>Расписание:</div>

        <div className='schedule-range__date-block'>
          <div ref={leftDatePickerRef} className='schedule-range__date-wrap'>
            <div
              onClick={onStartDateClick}
              className='schedule-range__start-date'
            >
              {startOfRange.format('DD-MM-YYYY')}
            </div>
            {isLeftDatePickerVisible && (
              <DatePicker
                owner={'schedule-range'}
                date={startOfRange}
                setDate={setStartDate}
                setVisible={setStartVisible}
              ></DatePicker>
            )}
          </div>

          <span className='schedule-range__dash'>一</span>

          <div ref={rightDatePickerRef} className='schedule-range__date-wrap'>
            <div onClick={onEndDateClick} className='schedule-range__end-date'>
              {endOfRange.format('DD-MM-YYYY')}
            </div>
            {isRightDatePickerVisible && (
              <DatePicker
                owner={'schedule-range'}
                date={endOfRange}
                setDate={setEndDate}
                setVisible={setEndVisible}
              ></DatePicker>
            )}
          </div>
        </div>
      </div>
      {/* </form> */}

      <DayList></DayList>
    </div>
  );
};

export default ScheduleRange;
