import React, { useState, useEffect } from 'react';
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
import { buildRange, RangeType } from './buildRange';
import { DayList, RangeDatePicker } from '../../components';
import { useQuery } from '../supports/hooks';

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
  const [range, setRange] = useState<RangeType | null>(null);
  const history = useHistory();

  let query = useQuery();
  let startDate = query.get('start');
  let endDate = query.get('end');

  useEffect(() => {
    const start = startOfRange.clone().startOf('day');
    const end = endOfRange.clone().add(1, 'day').startOf('day');

    setRange(buildRange(events, start, end));
  }, [events, startOfRange, endOfRange, history]);

  useEffect(() => {
    dispatch(setStartOFRange(moment(startDate, 'YYYY-MM-DD')));
    dispatch(setEndOFRange(moment(endDate, 'YYYY-MM-DD')));
  }, [startDate, endDate, dispatch]);

  const setStart = (value: moment.Moment) => {
    history.push({
      search: `?start=${value.format('YYYY-MM-DD')}&end=${endOfRange.format(
        'YYYY-MM-DD'
      )}`,
      // state: {
      //   from: history.location.pathname,
      //   query: `?start=${startDate}&end=${endDate}`,
      // },
    });
    return setStartOFRange(value);
  };

  const setEnd = (value: moment.Moment) => {
    history.push({
      search: `?start=${startOfRange.format('YYYY-MM-DD')}&end=${value.format(
        'YYYY-MM-DD'
      )}`,
      // state: {
      //   from: history.location.pathname,
      //   query: `?start=${startDate}&end=${endDate}`,
      // },
    });

    return setEndOFRange(value);
  };

  return (
    <>
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

      <DayList
        range={range}
        msg={`c ${startOfRange.format('DD-MM-YYYY')} по ${endOfRange.format(
          'DD-MM-YYYY'
        )}`}
      />
    </>
  );
};

export default Range;
