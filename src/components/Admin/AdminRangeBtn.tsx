import React from 'react';
import { Link } from 'react-router-dom';
import { useActions } from '../supports/Hooks';

const AdminRangeBtn: React.FC = () => {
  const { setALLPopupsUnvisible, setSelectedUser } = useActions();

  const onRangeBtnClick = (): void => {
    setALLPopupsUnvisible();
    setSelectedUser(null);
  };

  return (
    <Link
      onClick={onRangeBtnClick}
      className='link control-panel__range-btn'
      to='/admin'
    >
      Пользователи
    </Link>
  );
};

export default AdminRangeBtn;
