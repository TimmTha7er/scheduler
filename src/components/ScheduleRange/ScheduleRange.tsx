import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  setRadioBtnValue,
  setALLPopupsUnvisible,
  setRowDate,
} from '../../redux/actions';
import { Range, NextDays, NextEvents, RadioBtn } from '../../components';

const ScheduleRange: React.FC = () => {
  const dispatch = useDispatch();
  const { radioBtnValue } = useSelector((state: RootState) => state.range);
  const range = radioBtnValue === 'schedule' && <Range />;
  const nextDays = radioBtnValue === 'n-days' && <NextDays />;
  const nextEvent = radioBtnValue === 'n-events' && <NextEvents />;

  const onLabelClick = useCallback(
    (value: string) => {
      dispatch(setRadioBtnValue(value));
      dispatch(setALLPopupsUnvisible());
      dispatch(setRowDate(null));
    },
    [dispatch]
  );

  return (
    <div className='schedule-range'>
      <RadioBtn
        defaultChecked={radioBtnValue}
        options={[
          { value: 'schedule', text: 'Промежуток' },
          { value: 'n-days', text: 'В ближайшее время' },
          { value: 'n-events', text: 'Ближайшие события' },
        ]}
        name='range-radio-btn'
        onLabelClick={onLabelClick}
      />

      {range}
      {nextDays}
      {nextEvent}
    </div>
  );
};

export default ScheduleRange;
