import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInput1, useFocus, useQuery } from '../supports/hooks';
import { RootState } from '../../redux/store';
import moment from 'moment';
import 'moment/locale/ru';
import { buildRange, RangeType } from './buildRange';
import { setNextDaysNum, setSelectValue } from '../../redux/actions';
import { DayList, Select } from '../../components';
// import { useHistory } from 'react-router-dom';
import { push } from 'connected-react-router';

const NextDays: React.FC = () => {
  const dispatch = useDispatch();
  const {
    grid: { events },
    range: { selectValue, nextDaysNum },
  } = useSelector((state: RootState) => state);
  const [range, setRange] = useState<RangeType | null>(null);
  const inputRef = useFocus();

  // const history = useHistory();
  const query = useQuery();
  const num = query.get('num') || '';
  const interval = query.get('interval') || '';
  const numPattern = /^(?:\d{1}|\d{2})$/;
  const intervalPattern = /суток|часов/;
  const input = useInput1(num, 2, numPattern);

  useEffect(() => {
    if (!numPattern.test(num) || !intervalPattern.test(interval)) {
      dispatch(
        push({
          search: `?num=${nextDaysNum}&interval=${selectValue}`,
        })
      );
    }
  }, []);

  useEffect(() => {
    input.onChange(num);
    dispatch(setNextDaysNum(num));
    dispatch(setSelectValue(interval));
  }, [dispatch, num, interval]);

  useEffect(() => {
    const startOfRange = moment().clone().startOf('hour');
    const units = selectValue === 'суток' ? 'day' : 'hour';
    const endOfRange = startOfRange.clone().add(nextDaysNum, units);

    const range = !startOfRange.isSame(endOfRange, 'milliseconds')
      ? buildRange(events, startOfRange, endOfRange)
      : [];

    setRange(range);
  }, [events, nextDaysNum, selectValue, dispatch]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    const pattern = /^[0-9\b]+$/;

    if (pattern.test(inputValue) || inputValue === '') {
      input.onChange(inputValue);
      dispatch(setNextDaysNum(inputValue));

      dispatch(
        push({
          search: `?num=${inputValue}&interval=${selectValue}`,
        })
      );
    }
  };

  const onOptionClick = useCallback(
    (value) => {
      dispatch(setSelectValue(value));
    },
    [dispatch]
  );

  const onAddBtnClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const inputValue = (+input.value + 1).toString();

    if (numPattern.test(inputValue)) {
      input.onChange(inputValue);
      dispatch(setNextDaysNum(input.value));

      dispatch(
        push({
          search: `?num=${inputValue}&interval=${selectValue}`,
        })
      );
    }
  };

  const onSubBtnClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const inputValue = (+input.value - 1).toString();

    if (numPattern.test(inputValue)) {
      input.onChange(inputValue);
      dispatch(setNextDaysNum(input.value));

      dispatch(
        push({
          search: `?num=${inputValue}&interval=${selectValue}`,
        })
      );
    }
  };

  return (
    <>
      <form className='next-days'>
        <div className='next-days__field'>
          <label className='next-days__label' htmlFor=''>
            За ближайшие
          </label>
          <div className='next-events__wrap'>
            <div className='next-days__change-count'>
              <button onClick={onAddBtnClick} className='next-days__btn-add'>
                +
              </button>
              <input
                value={input.value}
                onChange={handleChange}
                className='next-days__input'
                type='text'
                autoComplete='off'
                maxLength={2}
                ref={inputRef}
              />
              <button
                onClick={onSubBtnClick}
                className='next-days__btn-subtract'
              >
                -
              </button>
            </div>
            <div className='next-days__text'>
              <Select
                options={['суток', 'часов']}
                defaultSelected={selectValue}
                onOptionClick={onOptionClick}
              ></Select>
            </div>
          </div>
        </div>
      </form>

      <DayList range={range} msg={`за ближайшие ${num} ${selectValue}`} />
    </>
  );
};

export default NextDays;
