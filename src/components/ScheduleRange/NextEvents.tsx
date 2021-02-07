import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput, useFocus, useQuery } from '../supports/hooks';
import { RootState } from '../../redux/store';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import { setNextEventsNum } from '../../redux/actions';
import { buildRange, RangeType } from './buildRange';
import { DayList } from '../../components';

const NextEvents: React.FC = () => {
  const dispatch = useDispatch();
  const {
    grid: { events },
  } = useSelector((state: RootState) => state);
  const [range, setRange] = useState<RangeType>([]);
  const inputRef = useFocus();

  const history = useHistory();
  const query = useQuery();
  const num = query.get('num') || '';
  const input = useInput(num, 2, /^[0-9\b]+$/);

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
        parseInt(input.value) || 0
      )
    );

    dispatch(setNextEventsNum(num));
  }, [dispatch, events, input.value, num]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    const pattern = /^[0-9\b]+$/;

    if (pattern.test(inputValue)) {
      history.push({
        search: `?num=${inputValue}`,
      });

      input.onChange(event);
      dispatch(setNextEventsNum(event.currentTarget.value));
    }
  };

  return (
    <>
      <form className='next-events'>
        <div className='next-events__field'>
          <label className='next-events__label' htmlFor=''>
            Ближайшие
          </label>
          {/* <button>+</button> */}
          <input
            value={num}
            onChange={handleChange}
            className='next-events__input'
            type='text'
            autoComplete='off'
            maxLength={2}
            ref={inputRef}
          />
          {/* <button>-</button> */}
          <span className='next-events__label'>событий</span>
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
