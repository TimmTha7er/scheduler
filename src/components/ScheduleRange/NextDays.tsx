import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInput, useFocus } from '../supports/hooks';
import { RootState } from '../../redux/store';
import moment from 'moment';
import 'moment/locale/ru';
import { buildRange, RangeType } from './buildRange';
import { setNextDaysNum } from '../../redux/actions';
import { DayList } from '../../components';

const NextDays: React.FC = () => {
  const dispatch = useDispatch();
  const {
    grid: { events },
    range: { nextDaysNum },
  } = useSelector((state: RootState) => state);
  const [range, setRange] = useState<RangeType>([]);
  const input = useInput(nextDaysNum, 3, /^[0-9\b]+$/);
  const inputRef = useFocus();

  useEffect(() => {
    const startOfRange = moment().clone().endOf('day');
    const endOfRange = startOfRange
      .clone()
      .add(input.value || 0, 'day')
      .startOf('day');

    const range = !startOfRange.isSame(endOfRange, 'date')
      ? buildRange(events, startOfRange, endOfRange)
      : [];

    setRange(range);
  }, [events, input.value]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    input.onChange(event);
    dispatch(setNextDaysNum(event.currentTarget.value));
  };

  return (
    <>
      <form className='next-days'>
        <div className='next-days__field'>
          <label className='next-days__label' htmlFor=''>
            Cобытия за ближайшие
          </label>
          <input
            value={input.value}
            onChange={handleChange}
            className='next-days__input'
            type='text'
            autoComplete='off'
            maxLength={3}
            ref={inputRef}
          />
          <span className='next-days__label'>дней</span>
        </div>
      </form>

      <DayList range={range}></DayList>
    </>
  );
};

export default NextDays;
