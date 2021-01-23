import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { buildRange, RangeType } from './buildRange';
import NewDayList from './NewDayList';
import moment from 'moment';
import 'moment/locale/ru';
import { useInput, useFocus } from '../supports/hooks';

const NextDays: React.FC = () => {
  const {
    grid: { events },
  } = useSelector((state: RootState) => state);
  const [range, setRange] = useState<RangeType>([]);
  const input = useInput('4');
  const inputRef = useFocus();

  useEffect(() => {
    const startOfRange = moment().startOf('hour');
    const endOfRange = startOfRange
      .clone()
      .add(input.value, 'day')
      .startOf('day');

    setRange(buildRange(events, startOfRange, endOfRange));
  }, [events, input.value]);

  return (
    <>
      <div className='form__field'>
        <label className='form__label' htmlFor=''>
          Кол-во дней
        </label>
        <input
          value={input.value}
          onChange={input.onChange}
          className='form__input'
          type='text'
          autoComplete='off'
          maxLength={120}
          ref={inputRef}
        />
      </div>
      <NewDayList range={range}></NewDayList>
    </>
  );
};

export default NextDays;
