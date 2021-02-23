import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNextEventsNum } from '../../redux/actions';
import { useInput, useFocus, useQuery } from '../supports/hooks';
import { useHistory } from 'react-router';
import { RootState } from '../../redux/store';

const NextEvents: React.FC = () => {
  const dispatch = useDispatch();
  const {
    admin: { selectedUser },
    auth: { user },
  } = useSelector((state: RootState) => state);
  const inputRef = useFocus();

  const history = useHistory();
  const query = useQuery();
  const num = query.get('num') || '';
  const pattern = /^(?:\d{1}|\d{2})$/;
  const input = useInput(num, 2, pattern);
  const uidQuery = user?.role === 'admin' ? `&uid=${selectedUser?.id}` : '';

  useEffect(() => {
    input.onChange(num);
    dispatch(setNextEventsNum(num));
  }, [num]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

    if (pattern.test(inputValue) || inputValue === '') {
      input.onChange(inputValue);
      dispatch(setNextEventsNum(inputValue));

      history.push({
        search: `?num=${inputValue}${uidQuery}`,
      });
    }
  };

  const onAddBtnClick = (event: React.FormEvent<HTMLButtonElement>) => {
    inputRef.current!.focus();
    event.preventDefault();
    const inputValue = (+input.value + 1).toString();

    if (pattern.test(inputValue)) {
      input.onChange(inputValue);
      dispatch(setNextEventsNum(input.value));

      history.push({
        search: `?num=${inputValue}${uidQuery}`,
      });
    }
  };

  const onSubBtnClick = (event: React.FormEvent<HTMLButtonElement>) => {
    inputRef.current!.focus();
    event.preventDefault();
    const inputValue = (+input.value - 1).toString();

    if (pattern.test(inputValue)) {
      input.onChange(inputValue);
      dispatch(setNextEventsNum(input.value));

      history.push({
        search: `?num=${inputValue}${uidQuery}`,
      });
    }
  };

  return (
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
  );
};

export default NextEvents;
