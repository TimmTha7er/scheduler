import React from 'react';
import { Link } from 'react-router-dom';
import catImg from '../../img/404cat.gif';

const NotFound: React.FC = () => {
  return (
    <div className='not-found'>
      <div className='not-found__error'>404</div>
      <h2 className='not-found__title'>Страница не найдена</h2>
      <img className='not-found__img' src={catImg} alt='cat' />
      <Link to='/' className='not-found__link link'>
        вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
