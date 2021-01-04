import { connect } from 'react-redux';
import { setNextDay, setPrevDay, setToday } from '../../redux/actions';

const GridNav = ({ setNextDay, setPrevDay, setToday }) => {
  return (
    <div className='gridnav header__gridnav'>
      <button
        onClick={() => setPrevDay()}
        className='gridnav__btn gridnav__btn_prev icon icon-left-open-big'
        title='Предыдущий период'
      ></button>
      <button
        onClick={() => setToday()}
        className='gridnav__btn gridnav__btn_today'
      >
        Сегодня
      </button>

      <button
        onClick={() => setNextDay()}
        className='gridnav__btn gridnav__btn_next  icon icon-right-open-big'
        title='Следующий период'
      ></button>
    </div>
  );
};

const mapStateToProps = ({ datePicker: { date } }) => {
  const selectedMonthDay = date.format('D');
  const selectedWeedDay = date.format('ddd');

  return { selectedMonthDay, selectedWeedDay };
};

const mapDistatchToProps = {
  setNextDay,
  setPrevDay,
  setToday,
};

export default connect(mapStateToProps, mapDistatchToProps)(GridNav);
