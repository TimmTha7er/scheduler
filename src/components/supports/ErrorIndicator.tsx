import React from 'react';
import catImg from '../../img/404cat.gif';

interface ErrorIndicatorProps {
  msg?: string;
}

const ErrorIndicator: React.FC<ErrorIndicatorProps> = ({
  msg = 'Что-то пошло не так!',
}) => {
  return (
    <div className='error-indicator'>
      <div className='error-indicator__title'>Ошибка</div>
      <div className='error-indicator__msg'>{msg}</div>
      <img className='not-found__img' src={catImg} alt='cat' />
    </div>
  );
};

export default ErrorIndicator;
