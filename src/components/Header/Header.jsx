import GridNav from '../GridNav/GridNav.jsx';
import DatePicker from '../DatePicker/DatePicker.jsx';

const Header = ({ selectedMonth, selectedYear }) => {
  return (
    <header className='header'>
      <div className='header__selected-date'>
        <div className='header__selected-month'>{selectedMonth}</div>
        <div className='header__selected-year'>{selectedYear}</div>
      </div>
      <DatePicker
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      ></DatePicker>
      <GridNav></GridNav>
    </header>
  );
};

export default Header;
