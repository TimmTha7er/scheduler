import GridNav from '../GridNav/GridNav.jsx';
import DatePicker from '../DatePicker/DatePicker.jsx';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__selected-date'>
        <div className='header__selected-month'>декабрь</div>
        <div className='header__selected-year'>2020</div>
      </div>
      {/* <DatePicker></DatePicker> */}
      <GridNav></GridNav>
    </header>
  );
};

export default Header;
