import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useInput, useFocus, useQuery } from '../supports/hooks';
import { RootState } from '../../redux/store';
import { setNextDaysNum, setSelectValue } from '../../redux/actions';
import { Select } from '../../components';
import { useHistory } from 'react-router';

const NextDays: React.FC = () => {
  const dispatch = useDispatch();
  const {
    range: { selectValue },
  } = useSelector((state: RootState) => state);
  const inputRef = useFocus();

  const history = useHistory();
  const query = useQuery();
  const num = query.get('num') || '';
  const interval = query.get('interval') || '';
  const numPattern = /^(?:\d{1}|\d{2})$/;
  const input = useInput(num, 2, numPattern);

  useEffect(() => {
    input.onChange(num);
    dispatch(setNextDaysNum(num));
    dispatch(setSelectValue(interval));
  }, [num, interval]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    const pattern = /^[0-9\b]+$/;

    if (pattern.test(inputValue) || inputValue === '') {
      input.onChange(inputValue);
      dispatch(setNextDaysNum(inputValue));

      history.push({
        search: `?num=${inputValue}&interval=${selectValue}`,
      });
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
    inputRef.current!.focus();
    const inputValue = (+input.value + 1).toString();

    if (numPattern.test(inputValue)) {
      input.onChange(inputValue);
      dispatch(setNextDaysNum(input.value));

      history.push({
        search: `?num=${inputValue}&interval=${selectValue}`,
      });
    }
  };

  const onSubBtnClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    inputRef.current!.focus();
    const inputValue = (+input.value - 1).toString();

    if (numPattern.test(inputValue)) {
      input.onChange(inputValue);
      dispatch(setNextDaysNum(input.value));

      history.push({
        search: `?num=${inputValue}&interval=${selectValue}`,
      });
    }
  };

  return (
    <form className='next-days'>
      <div className='next-days__field'>
        <label className='next-days__label' htmlFor=''>
          За ближайшие
        </label>
        <div className='next-events__wrap'>
          <div className='next-days__change-count'>
            <button
              onClick={onAddBtnClick}
              className='next-days__btn-add'
            ></button>
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
            ></button>
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
  );
};

export default NextDays;
