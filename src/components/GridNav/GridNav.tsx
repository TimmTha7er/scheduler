import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setStartOFRange,
  setEndOFRange,
  setALLPopupsUnvisible,
  setRowDate
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { DatePickerActionTypes } from '../../redux/actions/datePicker';
import moment from 'moment';
import 'moment/locale/ru';
import leftBtnImg from '../../img/angle-left.svg';
import rightBtnImg from '../../img/angle-right.svg';

interface GridNavProps {
  setDate: (date: moment.Moment) => DatePickerActionTypes;
}

const GridNav: React.FC<GridNavProps> = ({ setDate }) => {
  const dispatch = useDispatch();
  const {
    datePicker: { date },
    range: { isRangeVisible, startOfRange, endOfRange },
  } = useSelector((state: RootState) => state);

  const onPrevBtnClick = (): void => {
    const prevDay: moment.Moment = date.clone().subtract(1, 'day');
    setDate(prevDay);
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));

    if (isRangeVisible) {
      const start: moment.Moment = startOfRange.clone().subtract(1, 'week');
      const end: moment.Moment = endOfRange.clone().subtract(1, 'week');
      dispatch(setStartOFRange(start));
      dispatch(setEndOFRange(end));
    }
  };

  const onTodayBtnClick = () => {
    const today: moment.Moment = moment();
    setDate(today);
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));

    if (isRangeVisible) {
      const start: moment.Moment = moment().clone().startOf('week');
      const end: moment.Moment = moment().clone().endOf('week');
      dispatch(setStartOFRange(start));
      dispatch(setEndOFRange(end));
    }
  };

  const onNextBtnClick = () => {
    const nextDay: moment.Moment = date.clone().add(1, 'day');
    setDate(nextDay);
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));

    if (isRangeVisible) {
      const start: moment.Moment = startOfRange.clone().add(1, 'week');
      const end: moment.Moment = endOfRange.clone().add(1, 'week');
      dispatch(setStartOFRange(start));
      dispatch(setEndOFRange(end));
    }
  };

  return (
    <div className='gridnav header__gridnav'>
      <button
        onClick={onPrevBtnClick}
        // className='gridnav__btn gridnav__btn_prev icon icon-left-open-big'
        className='gridnav__btn gridnav__btn_prev'
        title='Предыдущий период'
      >
        <img className='gridnav__btn-img' src={leftBtnImg} alt='<' />
      </button>
      <button
        onClick={onTodayBtnClick}
        className='gridnav__btn gridnav__btn_today'
      >
        Сегодня
      </button>

      <button
        onClick={onNextBtnClick}
        // className='gridnav__btn gridnav__btn_next  icon icon-right-open-big'
        className='gridnav__btn gridnav__btn_next'
        title='Следующий период'
      >
        <img className='gridnav__btn-img' src={rightBtnImg} alt='>' />
      </button>
    </div>
  );
};

export default React.memo(GridNav);
// export default GridNav;
