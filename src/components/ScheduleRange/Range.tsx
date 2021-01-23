import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import NewDayList from './NewDayList';
import { useClickOutside } from '../supports/hooks';
import { DatePicker } from '../../components';
import { buildRange, RangeType } from './buildRange';

import {
  setStartOFRange,
  setEndOFRange,
  setLeftDatePickerVisible,
  setRightDatePickerVisible,
  setALLPopupsUnvisible,
} from '../../redux/actions';

const Range: React.FC = () => {
  const dispatch = useDispatch();
  const {
    grid: { events },
    range: {
      startOfRange,
      endOfRange,
      isLeftDatePickerVisible,
      isRightDatePickerVisible,
    },
  } = useSelector((state: RootState) => state);
  const [range, setRange] = useState<RangeType>([]);

  useEffect(() => {
    setRange(buildRange(events, startOfRange, endOfRange));
  }, [events, startOfRange, endOfRange]);

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

  const leftDatePickerRef = useClickOutside(setStartVisible);
  const rightDatePickerRef = useClickOutside(setEndVisible);

  return (
    <>
      <div className='schedule-range__range-wrap'>
        {/* <div className='schedule-range__label'>Расписание:</div> */}

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

      <NewDayList range={range}></NewDayList>
    </>
  );
};

export default Range;
