import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setALLPopupsUnvisible, setSelectedUser } from '../../redux/actions';

const AdminRangeBtn: React.FC = () => {
  const dispatch = useDispatch();

  const onRangeBtnClick = (): void => {
    dispatch(setALLPopupsUnvisible());
    dispatch(setSelectedUser(null));
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
