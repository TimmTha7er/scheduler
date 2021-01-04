import { useState, useRef, useEffect } from 'react';
import GridNav from '../GridNav/GridNav.jsx';
import DatePicker from '../DatePicker/DatePicker.jsx';
import { connect } from 'react-redux';
import { setVisible } from '../../redux/actions';

const Header = ({ selectedMonth, selectedYear, isVisible, setVisible }) => {
  const datePickerRef = useRef();

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      // ???
      // setVisible(false);
    };
  }, []);

  const handleOutsideClick = (e) => {
    if (!e.path.includes(datePickerRef.current)) {
      setVisible(false);
    }
  };

  const onSelectedDateClick = () => {
    setVisible(!isVisible);
  };

  return (
    <header className='header'>
      <div ref={datePickerRef} className='header__wrap'>
        <div onClick={onSelectedDateClick} className='header__selected-date'>
          <div className='header__selected-month'>{selectedMonth}</div>
          <div className='header__selected-year'>{selectedYear}</div>
        </div>
        {isVisible && <DatePicker></DatePicker>}
      </div>

      <GridNav></GridNav>
    </header>
  );
};

const mapStateToProps = ({ datePicker: { date, isVisible } }) => {
  const selectedMonth = date.format('MMMM');
  const selectedYear = date.format('YYYY');

  return { selectedMonth, selectedYear, isVisible };
};

const mapDistatchToProps = {
  setVisible: setVisible,
};

export default connect(mapStateToProps, mapDistatchToProps)(Header);
