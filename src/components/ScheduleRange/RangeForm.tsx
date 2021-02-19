import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  setStartOFRange,
  setEndOFRange,
  setLeftDatePickerVisible,
  setRightDatePickerVisible,
} from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import { RangeDatePicker } from '../../components';
import { useQuery } from '../supports/hooks';

const RangeForm: React.FC = () => {
  const dispatch = useDispatch();
  const {
    range: {
      startOfRange,
      endOfRange,
      isLeftDatePickerVisible,
      isRightDatePickerVisible,
    },
  } = useSelector((state: RootState) => state);

  const history = useHistory();
  const query = useQuery();
  const startDate = query.get('start');
  const endDate = query.get('end');

  useEffect(() => {
    dispatch(setStartOFRange(moment(startDate, 'YYYY-MM-DD')));
    dispatch(setEndOFRange(moment(endDate, 'YYYY-MM-DD')));
  }, [startDate, endDate]);

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
