import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { RangeDatePicker } from '../../components';
import { useActions, useRouter, useTypedSelector } from '../supports/Hooks/';

const RangeForm: React.FC = () => {
  const {
    setStartOFRange,
    setEndOFRange,
    setLeftDatePickerVisible,
    setRightDatePickerVisible,
  } = useActions();
  const {
    range: {
      startOfRange,
      endOfRange,
      isLeftDatePickerVisible,
      isRightDatePickerVisible,
    },
  } = useTypedSelector((state) => state);

  const { history, query } = useRouter();
  const startDateQuery = query.start;
  const endDateQuery = query.end;

  useEffect(() => {
    setStartOFRange(moment(startDateQuery, 'YYYY-MM-DD'));
    setEndOFRange(moment(endDateQuery, 'YYYY-MM-DD'));
  }, [startDateQuery, endDateQuery]);

  const setStart = (value: moment.Moment) => {
    history.push({
      search: `?start=${value.format('YYYY-MM-DD')}&end=${endOfRange.format(
        'YYYY-MM-DD'
      )}`,
    });

    return setStartOFRange(value);
  };

  const setEnd = (value: moment.Moment) => {
    history.push({
      search: `?start=${startOfRange.format('YYYY-MM-DD')}&end=${value.format(
        'YYYY-MM-DD'
      )}`,
    });

    return setEndOFRange(value);
  };

  return (
    <div className='schedule-range__range-wrap'>
      <div className='schedule-range__date-block'>
        <RangeDatePicker
          date={startOfRange}
          isVisible={isLeftDatePickerVisible}
          setVisible={setLeftDatePickerVisible}
          setDateOfRange={setStart}
          position={'start'}
        ></RangeDatePicker>

        <span className='schedule-range__dash'>一</span>

        <RangeDatePicker
          date={endOfRange}
          isVisible={isRightDatePickerVisible}
          setVisible={setRightDatePickerVisible}
          setDateOfRange={setEnd}
          position={'end'}
        ></RangeDatePicker>
      </div>
    </div>
  );
};

export default RangeForm;
