import React, { useEffect } from 'react';
import {
  useInput,
  useFocus,
  useTypedSelector,
  useActions,
  useRouter,
} from '../supports/Hooks/';

const NextEvents: React.FC = () => {
  const { setNextEventsNum } = useActions();
  const {
    admin: { selectedUser },
    auth: { user },
  } = useTypedSelector((state) => state);
  const inputRef = useFocus();

  const { history, query } = useRouter();
  const numQuery = query.num || '';
  const pattern = /^(?:\d{1}|\d{2})$/;
  const uidQuery = user?.role === 'admin' ? `&uid=${selectedUser?.id}` : '';
  const input = useInput(numQuery, 2, pattern);

  useEffect(() => {
    input.onChange(numQuery);
    setNextEventsNum(numQuery);
  }, [numQuery]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

    if (pattern.test(inputValue) || inputValue === '') {
      input.onChange(inputValue);
      setNextEventsNum(inputValue);

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
      setNextEventsNum(input.value);

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
      setNextEventsNum(input.value);

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
