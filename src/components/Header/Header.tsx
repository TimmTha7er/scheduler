import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../redux/actions';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';
import logoImg from '../../img/header-logo-cat-2.svg';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { authenticated },
  } = useSelector((state: RootState) => state);

  const onLogoutClick = () => {
    dispatch(signout());
  };

  return (
    <header className='header'>
      <Link to='/' className='header__logo logo link'>
        <img className='logo__img' src={logoImg} alt='logo cat' />
        <div className='logo__text'>
          <h4 className='logo__subtitle'>Мурр-Мяуу</h4>
          <h1 className='logo__title'>Календарь</h1>
        </div>
      </Link>
      <div className='user-bar'>
        {!authenticated ? (
          <div className='buttons'>
            <Link to='/sign-in' className='user-bar__sing-in-btn  link'>
              Войти
            </Link>
          </div>
        ) : (
          <button
            onClick={onLogoutClick}
            className='user-bar__sing-out-btn link'
          >
            Выйти
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
