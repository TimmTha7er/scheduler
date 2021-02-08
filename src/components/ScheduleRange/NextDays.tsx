import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInput, useFocus, useQuery } from '../supports/hooks';
import { RootState } from '../../redux/store';
import moment from 'moment';
import 'moment/locale/ru';
import { buildRange, RangeType } from './buildRange';
import { setNextDaysNum, setSelectValue } from '../../redux/actions';
import { DayList, Select } from '../../components';
import { useHistory } from 'react-router-dom';

const NextDays: React.FC<any> = () => {
  const dispatch = useDispatch();
  const {
    grid: { events },
    range: { selectValue },
  } = useSelector((state: RootState) => state);
  const [range, setRange] = useState<RangeType>([]);
  const inputRef = useFocus();

  const history = useHistory();
  const query = useQuery();
  const num = query.get('num') || '';
  const interval = query.get('interval') || '';
  const input = useInput(num, 2, /^[0-9\b]+$/);

  useEffect(() => {
    const startOfRange = moment().clone().startOf('hour');
    const units = selectValue === 'суток' ? 'day' : 'hour';
    const endOfRange = startOfRange.clone().add(input.value || 0, units);

    const range = !startOfRange.isSame(endOfRange, 'milliseconds')
      ? buildRange(events, startOfRange, endOfRange)
      : [];

    setRange(range);

    dispatch(setSelectValue(interval));
    dispatch(setNextDaysNum(num));
  }, [events, input.value, selectValue, num, interval, dispatch]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    const pattern = /^[0-9\b]+$/;

    if (pattern.test(inputValue) || inputValue === '') {
      history.push({
        search: `?num=${inputValue}&interval=${interval}`,
      });

      input.onChange(event);
      dispatch(setNextDaysNum(inputValue));
    }
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
            value={num}
            onChange={handleChange}
            className='next-days__input'
            type='text'
            autoComplete='off'
            maxLength={2}
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

      <DayList range={range} msg={`за ближайшие ${num} ${selectValue}`} />
    </>
  );
};

export default NextDays;
