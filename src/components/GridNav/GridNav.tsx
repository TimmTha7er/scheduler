import React from 'react';
import { connect } from 'react-redux';
import {
  setStartOFRange,
  setEndOFRange,
  setALLPopupsUnvisible,
} from '../../redux/actions';
import moment from 'moment';
import 'moment/locale/ru';
import { RootState } from '../../redux/reducers/index';
import { DatePickerActionTypes } from '../../redux/actions/datePicker';
import { GridActionsType } from '../../redux/actions/range';
import { PopupsActionTypes } from '../../redux/actions/popups';
import leftBtnImg from '../../img/angle-left.svg';
import rightBtnImg from '../../img/angle-right.svg';

type GridNavProps = {
  setDate: (date: moment.Moment) => DatePickerActionTypes;
  date: moment.Moment;
  isRangeVisible: boolean;
  setStartOFRange: (date: moment.Moment) => GridActionsType;
  setEndOFRange: (date: moment.Moment) => GridActionsType;
  startOfRange: moment.Moment;
  endOfRange: moment.Moment;
  setALLPopupsUnvisible: () => PopupsActionTypes;
};

const GridNav: React.FC<GridNavProps> = ({
  setDate,
  date,
  isRangeVisible,
  setStartOFRange,
  setEndOFRange,
  startOfRange,
  endOfRange,
  setALLPopupsUnvisible,
}) => {
  const onPrevBtnClick = (): void => {
    const prevDay: moment.Moment = date.clone().subtract(1, 'day');
    setDate(prevDay);
    setALLPopupsUnvisible();

    if (isRangeVisible) {
      const start: moment.Moment = startOfRange.clone().subtract(1, 'week');
      const end: moment.Moment = endOfRange.clone().subtract(1, 'week');
      setStartOFRange(start);
      setEndOFRange(end);
    }
  };

  const onTodayBtnClick = () => {
    const today: moment.Moment = moment();
    setDate(today);
    setALLPopupsUnvisible();

    if (isRangeVisible) {
      const start: moment.Moment = moment().clone().startOf('week');
      const end: moment.Moment = moment().clone().endOf('week');
      setStartOFRange(start);
      setEndOFRange(end);
    }
  };

  const onNextBtnClick = () => {
    const nextDay: moment.Moment = date.clone().add(1, 'day');
    setDate(nextDay);
    setALLPopupsUnvisible();

    if (isRangeVisible) {
      const start: moment.Moment = startOfRange.clone().add(1, 'week');
      const end: moment.Moment = endOfRange.clone().add(1, 'week');
      setStartOFRange(start);
      setEndOFRange(end);
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

const mapStateToProps = ({
  datePicker: { date },
  range: { isRangeVisible, startOfRange, endOfRange },
}: RootState) => {
  return { date, isRangeVisible, startOfRange, endOfRange };
};

const mapDistatchToProps = {
  setStartOFRange,
  setEndOFRange,
  setALLPopupsUnvisible,
};

export default connect(mapStateToProps, mapDistatchToProps)(GridNav);
