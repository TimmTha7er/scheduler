import React from 'react';
import Header from './Header/Header.jsx';
import Day from './Day/Day.jsx';
import CreatePopup from './CreatePopup/CreatePopup.jsx';
import DeletePopup from './DeletePopup/DeletePopup.jsx';
import PreviewPopup from './PreviewPopup/PreviewPopup.jsx';
import '../scss/index.scss';

function App() {
  return (
    <div className='container'>
      <Header></Header>
      <main className='main'>
        <Day></Day>

        {/* <CreatePopup></CreatePopup> */}
        {/* <DeletePopup></DeletePopup> */}
        {/* <PreviewPopup></PreviewPopup> */}
      </main>
    </div>
  );
}

export default App;
