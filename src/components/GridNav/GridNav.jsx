import { connect } from 'react-redux';
import {
  setStartOFRange,
  setEndOFRange,
  setALLPopupsUnvisible,
} from '../../redux/actions';
import moment from 'moment';
import 'moment/locale/ru';

const GridNav = ({
  setDate,
  date,
  isRangeVisible,
  setStartOFRange,
  setEndOFRange,
  startOfRange,
  endOfRange,
  setALLPopupsUnvisible
}) => {
  const onPrevBtnClick = () => {
    const prevDay = date.clone().subtract(1, 'day');
    setDate(prevDay);
    setALLPopupsUnvisible();

    if (isRangeVisible) {
      const start = startOfRange.clone().subtract(1, 'week');
      const end = endOfRange.clone().subtract(1, 'week');
      setStartOFRange(start);
      setEndOFRange(end);
    }
  };

  const onTodayBtnClick = () => {
    const today = moment();
    setDate(today);
    setALLPopupsUnvisible();

    if (isRangeVisible) {
      const start = moment().clone().startOf('week');
      const end = moment().clone().endOf('week');
      setStartOFRange(start);
      setEndOFRange(end);
    }
  };

  const onNextBtnClick = () => {
    const nextDay = date.clone().add(1, 'day');
    setDate(nextDay);
    setALLPopupsUnvisible();

    if (isRangeVisible) {
      const start = startOfRange.clone().add(1, 'week');
      const end = endOfRange.clone().add(1, 'week');
      setStartOFRange(start);
      setEndOFRange(end);
    }
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

const mapStateToProps = ({
  datePicker: { date },
  range: { isRangeVisible, startOfRange, endOfRange },
}) => {
  return { date, isRangeVisible, startOfRange, endOfRange };
};

const mapDistatchToProps = {
  setStartOFRange,
  setEndOFRange,
  setALLPopupsUnvisible
};

export default connect(mapStateToProps, mapDistatchToProps)(GridNav);
