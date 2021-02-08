import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className='home'>
      <h2 className='home__greeting'>
        Добро пожаловать в Мурр-Мяуу Календарь!
      </h2>
      <div className='home__text'>Для того чтобы продолжить нужно войти.</div>
    </div>
  );
};

export default HomePage;
