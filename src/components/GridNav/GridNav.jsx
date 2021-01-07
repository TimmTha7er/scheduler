import { connect } from 'react-redux';
// import { setDate } from '../../redux/actions';
import moment from 'moment';
import 'moment/locale/ru';

const GridNav = ({ setDate, date }) => {
  const onPrevBtnClick = () => {
    const prevDay = date.clone().subtract(1, 'day');

    setDate(prevDay);
  };

  const onTodayBtnClick = () => {
    const today = moment();

    setDate(today);
  };

  const onNextBtnClick = () => {
    const nextDay = date.clone().add(1, 'day');

    setDate(nextDay);
  };

  return (
    <div className='gridnav header__gridnav'>
      <button
        onClick={onPrevBtnClick}
        className='gridnav__btn gridnav__btn_prev icon icon-left-open-big'
        title='Предыдущий период'
      ></button>
      <button
        onClick={onTodayBtnClick}
        className='gridnav__btn gridnav__btn_today'
      >
        Сегодня
      </button>

      <button
        onClick={onNextBtnClick}
        className='gridnav__btn gridnav__btn_next  icon icon-right-open-big'
        title='Следующий период'
      ></button>
    </div>
  );
};

const mapStateToProps = ({ datePicker: { date } }) => {
  return { date };
};

const mapDistatchToProps = {
  // setDate,
};

export default connect(mapStateToProps, mapDistatchToProps)(GridNav);
