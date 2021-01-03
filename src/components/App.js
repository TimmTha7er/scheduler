import React from 'react';
import Header from './Header/Header.jsx';
import Day from './Day/Day.jsx';
import CreatePopup from './CreatePopup/CreatePopup.jsx';
import DeletePopup from './DeletePopup/DeletePopup.jsx';
import PreviewPopup from './PreviewPopup/PreviewPopup.jsx';
import moment from 'moment';
import 'moment/locale/ru';
import '../scss/index.scss';

function App() {
  // moment.locale('ru');
  console.log('день недели', moment().format('dd'));
  // console.log('начало месяца', moment().startOf('month'));
  // console.log('конец месяца', moment().endOf('month'));

  // console.log(
  //   'начало месяца c начала недели ))',
  //   moment().startOf('month').startOf('week')
  // );

  // console.log(
  //   'конец месяца и конец недели ))',
  //   moment().endOf('month').endOf('week')
  // );

  return (
    <div className='container'>
      <Header selectedMonth={'январь'} selectedYear={2020}></Header>
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
