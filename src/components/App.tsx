import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Header, Main, Popups } from '../components';
import '../scss/index.scss';

const App: React.FC = () => {
  return (
    <>
      <PerfectScrollbar>
        <div className='container'>
          <Header></Header>
          <Main></Main>
        </div>
      </PerfectScrollbar>
      <Popups></Popups>
    </>
  );
};

export default App;
