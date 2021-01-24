import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Range, NextDays, NextEvents, RangeRadioBtn } from '../../components';

const ScheduleRange: React.FC = () => {
  const { radioBtnValue } = useSelector((state: RootState) => state.range);
  const range = radioBtnValue === 'schedule' && <Range />;
  const nextDays = radioBtnValue === 'n-days' && <NextDays />;
  const nextEvent = radioBtnValue === 'n-events' && <NextEvents />;

  return (
    <div className='schedule-range'>
      <RangeRadioBtn></RangeRadioBtn>

      {range}
      {nextDays}
      {nextEvent}
    </div>
  );
};

export default ScheduleRange;
