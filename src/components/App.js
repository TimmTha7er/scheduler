import React, { useState } from 'react';
import Header from './Header/Header.jsx';
import Day from './Day/Day.jsx';
import CreatePopup from './CreatePopup/CreatePopup.jsx';
import DeletePopup from './DeletePopup/DeletePopup.jsx';
import PreviewPopup from './PreviewPopup/PreviewPopup.jsx';
import moment from 'moment';
import 'moment/locale/ru';
import '../scss/index.scss';

import { connect } from 'react-redux';

function App(props) {
  const [date, setDate] = useState(moment());

  // console.log(
  //   'date',
  //   date
  //     .locale('ru', { week: { dow: 2 } })
  //     .localeData()
  //     .weekdaysShort()
  // );

  console.log('props', props);

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

const mapStateToProps = (state) => {
  console.log('state', state.datePicker.date);

  return { date: state.datePicker.date };
};

const mapDistatchToProps = {};

export default connect(mapStateToProps, mapDistatchToProps)(App);
