import React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import '../scss/index.scss';

const App: React.FC = () => {
  return (
    <div className='container'>
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default App;
