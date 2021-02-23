import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setALLPopupsUnvisible,
  setRowDate,
  setSelectedUser,
  signout,
  usersLoaded,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import { UserBarLoader } from '../../components';

const UserBar: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { authenticated, loading },
  } = useSelector((state: RootState) => state);

  const onLogoutClick = () => {
    dispatch(signout());
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));
    dispatch(setSelectedUser(null));
    dispatch(usersLoaded([]));
  };

  if (loading) {
    return <UserBarLoader />;
  }

  return (
    <div className='user-bar'>
      {!authenticated ? (
        <div className='buttons'>
          <Link to='/sign-in' className='user-bar__sing-in-btn  link'>
            Войти
          </Link>
        </div>
      ) : (
        <button onClick={onLogoutClick} className='user-bar__sing-out-btn link'>
          Выйти
        </button>
      )}
    </div>
  );
};

export default UserBar;
