import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import moment from 'moment';
import 'moment/locale/ru';
import { buildRange, RangeType } from './buildRange';
import { DayList, ScheduleFormLoader, NextEventsForm } from '../../components';

const NextEvents: React.FC = () => {
  const dispatch = useDispatch();
  const {
    grid: { events },
    range: { nextEventsNum },
    auth: { loading },
  } = useSelector((state: RootState) => state);
  const [range, setRange] = useState<RangeType | null>(null);

  useEffect(() => {
    const startOfRange = moment().clone().startOf('hour');
    let endOfRange = moment().clone().startOf('hour');

    Object.keys(events).forEach((time) => {
      if (endOfRange.isBefore(new Date(time))) {
        endOfRange = moment(new Date(time));
      }
    });

    setRange(
      buildRange(
        events,
        startOfRange,
        endOfRange.clone().add(1, 'day'),
        +nextEventsNum
      )
    );
  }, [dispatch, events, nextEventsNum]);

  return (
    <>
      {loading ? <ScheduleFormLoader /> : <NextEventsForm />}

      <DayList
        range={range}
        msg={`с ${moment().clone().startOf('hour').format('DD-MM-YYYY HH:mm')}`}
      />
    </>
  );
};

export default NextEvents;
