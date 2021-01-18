import React from 'react';
import { Header, Main } from '../components';

import '../scss/index.scss';

const App: React.FC = () => {
  return (
    <div className='container'>
      <Header></Header>
      <Main></Main>
    </div>
  );
};

export default App;
