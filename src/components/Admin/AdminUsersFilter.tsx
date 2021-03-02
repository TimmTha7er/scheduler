import React from 'react';
import { AdminPageLoader } from '../../components';
import {
  useActions,
  useInput,
  useTypedSelector,
} from '../../components/supports/Hooks/';

const AdminUsersFilter: React.FC = () => {
  const { setFilter } = useActions();
  const {
    auth: { loading },
  } = useTypedSelector((state) => state);
  const input = useInput('');

  if (loading) {
    return <AdminPageLoader />;
  }

  const searchChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    input.onChange(inputValue);
    setFilter(inputValue);
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
        />
      </div>
    </div>
  );
};

export default AdminUsersFilter;
