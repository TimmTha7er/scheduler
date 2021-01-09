import React from 'react';
import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import '../scss/index.scss';

function App() {
  return (
    <div className='container'>
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default App;
