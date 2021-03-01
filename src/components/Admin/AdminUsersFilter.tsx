import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { AdminPageLoader } from '../../components';
import { useInput } from '../../components/supports/hooks';
import { setFilter } from '../../redux/actions';

const AdminUsersFilter: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { loading },
  } = useSelector((state: RootState) => state);
  const input = useInput('');

  if (loading) {
    return <AdminPageLoader />;
  }

  const searchChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;

    input.onChange(inputValue);
    dispatch(setFilter(inputValue));
  };

  return (
    <div className='admin-control-panel'>
      <div className='admin-control-panel__title'>Пользователи</div>
      <div className='admin-control-panel__input-wrap'>
        <input
          value={input.value}
          onChange={searchChangeHandler}
          className='admin-control-panel__filter input'
          type='text'
          autoComplete='off'
          maxLength={120}
          placeholder='имя, почта'
          // ref={inputRef}
        />
      </div>
    </div>
  );
};

export default AdminUsersFilter;
