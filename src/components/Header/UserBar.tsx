import React from 'react';
import { Link } from 'react-router-dom';
import { UserBarLoader } from '../../components';
import { useActions, useTypedSelector } from '../supports/Hooks';

const UserBar: React.FC = () => {
  const {
    setALLPopupsUnvisible,
    setRowDate,
    setSelectedUser,
    signout,
    usersLoaded,
  } = useActions();
  const {
    auth: { authenticated, loading },
  } = useTypedSelector((state) => state);

  const onLogoutClick = () => {
    signout();
    setALLPopupsUnvisible();
    setRowDate(null);
    setSelectedUser(null);
    usersLoaded([]);
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
