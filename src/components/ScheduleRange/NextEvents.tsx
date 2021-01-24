import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput, useFocus } from '../supports/hooks';
import { RootState } from '../../redux/store';
import moment from 'moment';
import 'moment/locale/ru';
import { setNextEventsNum } from '../../redux/actions';
import { buildRange, RangeType } from './buildRange';
import { DayList } from '../../components';

const NextEvents: React.FC = () => {
  const dispatch = useDispatch();
  const {
    grid: { events },
    range: { nextEventsNum },
  } = useSelector((state: RootState) => state);
  const [range, setRange] = useState<RangeType>([]);
  const input = useInput(nextEventsNum, 3, /^[0-9\b]+$/);
  const inputRef = useFocus();

  useEffect(() => {
    const startOfRange = moment().clone().startOf('hour');
    let endOfRange = moment().clone().startOf('hour');

    Object.keys(events).forEach((time) => {
      if (endOfRange.isBefore(new Date(time))) {
        endOfRange = moment(new Date(time));
      }
    });

    setRange(
      buildRange(events, startOfRange, endOfRange, parseInt(input.value) || 0)
    );
  }, [events, input.value]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    input.onChange(event);
    dispatch(setNextEventsNum(event.currentTarget.value));
  };

  return (
    <>
      <form className='next-events'>
        <div className='next-events__field'>
          <label className='next-events__label' htmlFor=''>
            Ближайшие
          </label>
          <input
            value={input.value}
            onChange={handleChange}
            className='next-events__input'
            type='text'
            autoComplete='off'
            maxLength={3}
            ref={inputRef}
          />
          <span className='next-events__label'>событий</span>
        </div>
      </form>
      
      <DayList range={range}></DayList>
    </>
  );
};

export default NextEvents;
