import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import moment from 'moment';
import 'moment/locale/ru';
import { buildRange, RangeType } from './buildRange';
import { DayList, ScheduleFormLoader, NextDaysForm } from '../../components';

const NextDays: React.FC = () => {
  const dispatch = useDispatch();
  const {
    grid: { events },
    range: { selectValue, nextDaysNum },
    auth: { loading },
  } = useSelector((state: RootState) => state);
  const [range, setRange] = useState<RangeType | null>(null);

  useEffect(() => {
    const startOfRange = moment().clone().startOf('hour');
    const units = selectValue === 'суток' ? 'day' : 'hour';
    const endOfRange = startOfRange.clone().add(nextDaysNum, units);

    const range = !startOfRange.isSame(endOfRange, 'milliseconds')
      ? buildRange(events, startOfRange, endOfRange)
      : [];

    setRange(range);
  }, [events, nextDaysNum, selectValue, dispatch]);

  return (
    <>
      {loading ? <ScheduleFormLoader /> : <NextDaysForm />}
      <DayList
        range={range}
        msg={`за ближайшие ${nextDaysNum} ${selectValue}`}
      />
    </>
  );
};

export default NextDays;
