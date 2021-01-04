import React, { useState } from 'react';
import Header from './Header/Header.jsx';
import Day from './Day/Day.jsx';
import CreatePopup from './CreatePopup/CreatePopup.jsx';
import DeletePopup from './DeletePopup/DeletePopup.jsx';
import PreviewPopup from './PreviewPopup/PreviewPopup.jsx';

import '../scss/index.scss';

function App(props) {
  // const [date, setDate] = useState(moment());

  // console.log(
  //   'date',
  //   date
  //     .locale('ru', { week: { dow: 2 } })
  //     .localeData()
  //     .weekdaysShort()
  // );



  return (
    <div className='container'>
      <Header></Header>
      <main className='main'>
        <Day></Day>

        {/* <CreatePopup></CreatePopup> */}
        {/* <DeletePopup></DeletePopup> */}
        {/* <PreviewPopup eventTitle='Название события' eventDescr='Описание события тря ля ля'></PreviewPopup> */}
      </main>
    </div>
  );
}

export default App;
