import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setStartOFRange,
  setEndOFRange,
  setALLPopupsUnvisible,
  setRowDate,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { DatePickerActionTypes } from '../../redux/interfaces';
import moment from 'moment';
import 'moment/locale/ru';
import leftBtnImg from '../../img/angle-left.svg';
import rightBtnImg from '../../img/angle-right.svg';
import { push } from 'connected-react-router';

interface GridNavProps {
  setDate: (date: moment.Moment) => DatePickerActionTypes;
}

const GridNav: React.FC<GridNavProps> = ({ setDate }) => {
  const dispatch = useDispatch();
  const {
    datePicker: { date },
    range: { startOfRange, endOfRange },
    router: { location },
  } = useSelector((state: RootState) => state);

  const onPrevBtnClick = (): void => {
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));

    if (location.pathname === '/schedule/range') {
      const start: moment.Moment = startOfRange.clone().subtract(1, 'week');
      const end: moment.Moment = endOfRange.clone().subtract(1, 'week');
      dispatch(setStartOFRange(moment(start, 'YYYY-MM-DD')));
      dispatch(setEndOFRange(moment(end, 'YYYY-MM-DD')));

      dispatch(
        push({
          search: `start=${start.format('YYYY-MM-DD')}&end=${end.format(
            'YYYY-MM-DD'
          )}`,
        })
      );
    } else if (location.pathname === '/day') {
      const prevDay: moment.Moment = date.clone().subtract(1, 'day');
      setDate(moment(prevDay, 'YYYY-MM-DD'));

      dispatch(
        push({
          search: `?date=${prevDay.format('YYYY-MM-DD')}`,
        })
      );
    }
  };

  const onTodayBtnClick = () => {
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));

    if (location.pathname === '/schedule/range') {
      const start: moment.Moment = moment().clone().startOf('month');
      const end: moment.Moment = moment().clone().endOf('month');
      dispatch(setStartOFRange(moment(start, 'YYYY-MM-DD')));
      dispatch(setEndOFRange(moment(end, 'YYYY-MM-DD')));

      dispatch(
        push({
          search: `start=${start.format('YYYY-MM-DD')}&end=${end.format(
            'YYYY-MM-DD'
          )}`,
        })
      );
    } else if (location.pathname === '/day') {
      const today: moment.Moment = moment();
      setDate(moment(today, 'YYYY-MM-DD'));

      dispatch(
        push({
          search: `?date=${today.format('YYYY-MM-DD')}`,
        })
      );
    }
  };

  const onNextBtnClick = () => {
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));

    if (location.pathname === '/schedule/range') {
      const start: moment.Moment = startOfRange.clone().add(1, 'week');
      const end: moment.Moment = endOfRange.clone().add(1, 'week');
      dispatch(setStartOFRange(moment(start, 'YYYY-MM-DD')));
      dispatch(setEndOFRange(moment(end, 'YYYY-MM-DD')));

      dispatch(
        push({
          search: `start=${start.format('YYYY-MM-DD')}&end=${end.format(
            'YYYY-MM-DD'
          )}`,
        })
      );
    } else if (location.pathname === '/day') {
      const nextDay: moment.Moment = date.clone().add(1, 'day');
      setDate(moment(nextDay, 'YYYY-MM-DD'));

      dispatch(
        push({
          search: `?date=${nextDay.format('YYYY-MM-DD')}`,
        })
      );
    }
  };

  return (
    <div className='gridnav control-panel__gridnav'>
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
