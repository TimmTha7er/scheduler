import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { buildRange, RangeType } from './buildRange';
import { DayList } from '../../components';
import RangeForm from './RangeForm';
import ScheduleFormLoader from '../supports/Loaders/ScheduleFormLoader';

const Range: React.FC = () => {
  const {
    grid: { events },
    range: { startOfRange, endOfRange },
    auth: { loading },
  } = useSelector((state: RootState) => state);
  const [range, setRange] = useState<RangeType | null>(null);

  useEffect(() => {
    const start = startOfRange.clone().startOf('day');
    const end = endOfRange.clone().add(1, 'day').startOf('day');
    const range = buildRange(events, start, end);

    setRange(range);
  }, [events, startOfRange, endOfRange]);

  return (
    <>
      {loading ? <ScheduleFormLoader /> : <RangeForm />}
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
