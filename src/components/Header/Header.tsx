import React from 'react';
import { Link } from 'react-router-dom';
import { UserBar } from '../../components';
import logoImg from '../../img/header-logo-cat-2.svg';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <Link to='/' className='header__logo logo link'>
        <img className='logo__img' src={logoImg} alt='logo cat' />
        <div className='logo__text'>
          <h4 className='logo__subtitle'>Мурр-Мяуу</h4>
          <h1 className='logo__title'>Календарь</h1>
        </div>
      </Link>

      <UserBar />
    </header>
  );
};

export default Header;
