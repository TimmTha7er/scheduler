import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInput, useFocus } from '../supports/hooks';
import { RootState } from '../../redux/store';
import moment from 'moment';
import 'moment/locale/ru';
import { buildRange, RangeType } from './buildRange';
import { setNextDaysNum, setSelectValue } from '../../redux/actions';
import { DayList, Select } from '../../components';

const NextDays: React.FC = () => {
  const dispatch = useDispatch();
  const {
    grid: { events },
    range: { nextDaysNum, selectValue },
  } = useSelector((state: RootState) => state);
  const [range, setRange] = useState<RangeType>([]);
  const input = useInput(nextDaysNum, 3, /^[0-9\b]+$/);
  const inputRef = useFocus();

  useEffect(() => {
    const startOfRange = moment().clone().startOf('hour');
    const units = selectValue === 'суток' ? 'day' : 'hour';
    const endOfRange = startOfRange.clone().add(input.value || 0, units);

    const range = !startOfRange.isSame(endOfRange, 'milliseconds')
      ? buildRange(events, startOfRange, endOfRange)
      : [];

    setRange(range);
  }, [events, input.value, selectValue]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    input.onChange(event);
    dispatch(setNextDaysNum(event.currentTarget.value));
  };

  const onOptionClick = useCallback(
    (value) => {
      dispatch(setSelectValue(value));
    },
    [dispatch]
  );

  return (
    <>
      <form className='next-days'>
        <div className='next-days__field'>
          <label className='next-days__label' htmlFor=''>
            За ближайшие
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
          <div className='next-days__label'>
            <Select
              options={['суток', 'часов']}
              defaultSelected={selectValue}
              onOptionClick={onOptionClick}
            ></Select>
          </div>
        </div>
      </form>

      <DayList range={range}></DayList>
    </>
  );
};

export default NextDays;
