import { useState, useRef, useEffect } from 'react';
import GridNav from '../GridNav/GridNav.jsx';
import DatePicker from '../DatePicker/DatePicker.jsx';

const Header = ({ selectedMonth, selectedYear }) => {
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  const datePickerRef = useRef();

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e) => {
    if (!e.path.includes(datePickerRef.current)) {
      setVisibleDatePicker(false);
    }
  };

  const onSelectedDateClick = () => {
    setVisibleDatePicker((prevState) => !prevState);
  };

  return (
    <header ref={datePickerRef} className='header'>
      <div onClick={onSelectedDateClick} className='header__selected-date'>
        <div className='header__selected-month'>{selectedMonth}</div>
        <div className='header__selected-year'>{selectedYear}</div>
      </div>

      {visibleDatePicker && (
        <DatePicker
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        ></DatePicker>
      )}

      <GridNav></GridNav>
    </header>
  );
};

export default Header;
