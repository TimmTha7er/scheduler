import React from 'react';
import Header from './Header/Header.jsx';
import Day from './Day/Day.jsx';
import { connect } from 'react-redux';
import { initialDate } from '../redux/actions';
import moment from 'moment';
import 'moment/locale/ru';
import '../scss/index.scss';

function App({ initialDate }) {
  initialDate(moment());

  return (
    <div className='container'>
      <Header></Header>
      <main className='main'>
        <Day></Day>
      </main>
    </div>
  );
}

const mapStateToProps = () => {
  return {};
};

const mapDistatchToProps = {
  initialDate,
};

export default connect(mapStateToProps, mapDistatchToProps)(App);
