import React from 'react';
import Header from './Header/Header.jsx';
import Day from './Day/Day.jsx';
import ScheduleRange from './ScheduleRange/ScheduleRange.jsx';
import { connect } from 'react-redux';

import CreatePopup from './CreatePopup/CreatePopup.jsx';
import PreviewPopup from './PreviewPopup/PreviewPopup.jsx';
import DeletePopup from './DeletePopup/DeletePopup.jsx';
// import { initialDate } from '../redux/actions';
// import moment from 'moment';
// import 'moment/locale/ru';
import '../scss/index.scss';

function App({
  initialDate,
  isRangeVisible,
  isCreatePopupVisible,
  isPreviewPopupVisible,
  isDeletePopupVisible,
}) {
  // initialDate(moment());

  return (
    <div className='container'>
      <Header></Header>
      <main className='main'>
        {isRangeVisible ? <ScheduleRange /> : <Day />}

        {isCreatePopupVisible && <CreatePopup></CreatePopup>}
        {isPreviewPopupVisible && <PreviewPopup></PreviewPopup>}
        {isDeletePopupVisible && <DeletePopup></DeletePopup>}
      </main>
    </div>
  );
}

const mapStateToProps = ({
  range: { isRangeVisible },
  popups: {
    isCreatePopupVisible,
    isPreviewPopupVisible,
    isDeletePopupVisible,
    // isEditPopupVisible,
  },
}) => {
  return {
    isRangeVisible,
    isCreatePopupVisible,
    isPreviewPopupVisible,
    isDeletePopupVisible,
  };
};

const mapDistatchToProps = {
  // initialDate,
};

export default connect(mapStateToProps, mapDistatchToProps)(App);
