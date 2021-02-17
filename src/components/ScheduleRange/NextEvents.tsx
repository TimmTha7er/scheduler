import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput, useFocus, useQuery } from '../supports/hooks';
import { RootState } from '../../redux/store';
import { useHistory } from 'react-router';
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
  const [range, setRange] = useState<RangeType | null>(null);
  const inputRef = useFocus();

  const history = useHistory();
  const query = useQuery();
  const num = query.get('num') || '';
  const pattern = /^(?:\d{1}|\d{2})$/;
  const input = useInput(num, 2, pattern);

  useEffect(() => {
    if (!pattern.test(num)) {
      history.push({
        search: `?num=${nextEventsNum}`,
      });
    } else {
      input.onChange(num);
      dispatch(setNextEventsNum(num));
    }
  }, [num]);

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

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

    if (pattern.test(inputValue) || inputValue === '') {
      input.onChange(inputValue);
      dispatch(setNextEventsNum(inputValue));

      history.push({
        search: `?num=${inputValue}`,
      });
    }
  };

  const onAddBtnClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const inputValue = (+input.value + 1).toString();

    if (pattern.test(inputValue)) {
      input.onChange(inputValue);
      dispatch(setNextEventsNum(input.value));

      history.push({
        search: `?num=${inputValue}`,
      });
    }
  };

  const onSubBtnClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const inputValue = (+input.value - 1).toString();

    if (pattern.test(inputValue)) {
      input.onChange(inputValue);
      dispatch(setNextEventsNum(input.value));

      history.push({
        search: `?num=${inputValue}`,
      });
    }
  };

  return (
    <>
      <form className='next-events'>
        <div className='next-events__field'>
          <label className='next-events__label' htmlFor=''>
            Ближайшие
          </label>
          <div className='next-events__wrap'>
            <div className='next-events__change-count'>
              <button
                onClick={onAddBtnClick}
                className='next-events__btn-add'
              ></button>
              <input
                value={input.value}
                onChange={handleChange}
                className='next-events__input'
                type='text'
                autoComplete='off'
                maxLength={2}
                ref={inputRef}
              />
              <button
                onClick={onSubBtnClick}
                className='next-events__btn-subtract'
              ></button>
            </div>
            <span className='next-events__text'>событий</span>
          </div>
        </div>
      </form>

      <DayList
        range={range}
        msg={`с ${moment().clone().startOf('hour').format('DD-MM-YYYY HH:mm')}`}
      />
    </>
  );
};

export default NextEvents;
