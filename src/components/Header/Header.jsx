import { useRef, useEffect } from 'react';
import GridNav from '../GridNav/GridNav.jsx';
import DatePicker from '../DatePicker/DatePicker.jsx';
import RangeBtn from '../RangeBtn/RangeBtn.jsx';
import { connect } from 'react-redux';
import {
  setVisible,
  setDate,
  setALLPopupsUnvisible,
} from '../../redux/actions';

const Header = ({
  selectedMonth,
  selectedYear,
  isVisible,
  setVisible,
  setDate,
  date,
  setALLPopupsUnvisible,
}) => {
  const datePickerRef = useRef();

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e) => {
    if (!e.path.includes(datePickerRef.current)) {
      setVisible(false);
    }
  };

  const onSelectedDateClick = () => {
    setVisible(!isVisible);
    setALLPopupsUnvisible();
  };

  return (
    <header className='header'>
      <div ref={datePickerRef} className='header__date-wrap'>
        <div onClick={onSelectedDateClick} className='header__selected-date'>
          <div className='header__selected-month'>{selectedMonth}</div>
          <div className='header__selected-year'>{selectedYear}</div>
        </div>
        {isVisible && (
          <DatePicker
            date={date}
            setDate={setDate}
            owner={'header'}
            setVisible={setVisible}
          ></DatePicker>
        )}
      </div>
      <div className='header__btns-wrap'>
        <GridNav setDate={setDate}></GridNav>
        <RangeBtn></RangeBtn>
      </div>
    </header>
  );
};

const mapStateToProps = ({ datePicker: { date, isVisible } }) => {
  const selectedMonth = date.format('MMMM');
  const selectedYear = date.format('YYYY');

  return { selectedMonth, selectedYear, isVisible, date };
};

const mapDistatchToProps = {
  setVisible,
  setDate,
  setALLPopupsUnvisible,
};

export default connect(mapStateToProps, mapDistatchToProps)(Header);
