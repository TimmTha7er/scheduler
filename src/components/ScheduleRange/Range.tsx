import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { buildRange, RangeType } from './buildRange';
import { DayList, RangeDatePicker } from '../../components';

import {
  setStartOFRange,
  setEndOFRange,
  setLeftDatePickerVisible,
  setRightDatePickerVisible,
} from '../../redux/actions';

const Range: React.FC = () => {
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
    const start = startOfRange.clone().startOf('day');
    const end = endOfRange.clone().add(1, 'day').startOf('day');

    setRange(buildRange(events, start, end));
  }, [events, startOfRange, endOfRange]);

  return (
    <>
      <div className='schedule-range__range-wrap'>
        {/* <div className='schedule-range__label'>Расписание:</div> */}

        <div className='schedule-range__date-block'>
          <RangeDatePicker
            date={startOfRange}
            isVisible={isLeftDatePickerVisible}
            setVisible={setLeftDatePickerVisible}
            setDateOfRange={setStartOFRange}
          ></RangeDatePicker>

          <span className='schedule-range__dash'>一</span>

          <RangeDatePicker
            date={endOfRange}
            isVisible={isRightDatePickerVisible}
            setVisible={setRightDatePickerVisible}
            setDateOfRange={setEndOFRange}
          ></RangeDatePicker>
        </div>
      </div>

      <DayList range={range}></DayList>
    </>
  );
};

export default Range;
