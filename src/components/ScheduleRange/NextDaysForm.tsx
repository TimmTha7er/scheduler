import React, { useCallback, useEffect } from 'react';
import {
  useInput,
  useFocus,
  useTypedSelector,
  useActions,
  useRouter,
} from '../supports/Hooks/';
import { Select } from '../../components';

const NextDays: React.FC = () => {
  const { setNextDaysNum, setSelectValue } = useActions();
  const {
    range: { selectValue },
    admin: { selectedUser },
    auth: { user },
  } = useTypedSelector((state) => state);
  const inputRef = useFocus();

  const { history, query } = useRouter();
  const numQuery = query.num || '';
  const intervalQuery = query.interval || '';
  const numPattern = /^(?:\d{1}|\d{2})$/;
  const uidQuery = user?.role === 'admin' ? `&uid=${selectedUser?.id}` : '';
  const input = useInput(numQuery, 2, numPattern);

  useEffect(() => {
    input.onChange(numQuery);
    setNextDaysNum(numQuery);
    setSelectValue(intervalQuery);
  }, [numQuery, intervalQuery]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    const pattern = /^[0-9\b]+$/;

    if (pattern.test(inputValue) || inputValue === '') {
      input.onChange(inputValue);
      setNextDaysNum(inputValue);

      history.push({
        search: `?num=${inputValue}&interval=${selectValue}${uidQuery}`,
      });
    }
  };

  const onOptionClick = useCallback((value) => {
    setSelectValue(value);
  }, []);

  const onAddBtnClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    inputRef.current!.focus();
    const inputValue = (+input.value + 1).toString();

    if (numPattern.test(inputValue)) {
      input.onChange(inputValue);
      setNextDaysNum(input.value);

      history.push({
        search: `?num=${inputValue}&interval=${selectValue}${uidQuery}`,
      });
    }
  };

  const onSubBtnClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    inputRef.current!.focus();
    const inputValue = (+input.value - 1).toString();

    if (numPattern.test(inputValue)) {
      input.onChange(inputValue);
      setNextDaysNum(input.value);

      history.push({
        search: `?num=${inputValue}&interval=${selectValue}${uidQuery}`,
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
