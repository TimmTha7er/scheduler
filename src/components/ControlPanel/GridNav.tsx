import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { DatePickerAction } from '../../redux/types';
import { useActions, useRouter, useTypedSelector } from '../supports/Hooks';
import leftBtnImg from '../../img/angle-left.svg';
import rightBtnImg from '../../img/angle-right.svg';

interface GridNavProps {
  setDate: (date: moment.Moment) => DatePickerAction;
}

const GridNav: React.FC<GridNavProps> = ({ setDate }) => {
  const {
    setStartOFRange,
    setEndOFRange,
    setALLPopupsUnvisible,
    setRowDate,
  } = useActions();
  const {
    datePicker: { date },
    range: { startOfRange, endOfRange },
    router: { location },
  } = useTypedSelector((state) => state);
  const { history } = useRouter();

  const onPrevBtnClick = (): void => {
    setALLPopupsUnvisible();
    setRowDate(null);

    if (location.pathname === '/schedule/range') {
      const start: moment.Moment = startOfRange.clone().subtract(1, 'week');
      const end: moment.Moment = endOfRange.clone().subtract(1, 'week');
      setStartOFRange(moment(start, 'YYYY-MM-DD'));
      setEndOFRange(moment(end, 'YYYY-MM-DD'));

      history.push({
        search: `start=${start.format('YYYY-MM-DD')}&end=${end.format(
          'YYYY-MM-DD'
        )}`,
      });
    } else if (location.pathname === '/day') {
      const prevDay: moment.Moment = date.clone().subtract(1, 'day');
      setDate(moment(prevDay, 'YYYY-MM-DD'));

      history.push({
        search: `?date=${prevDay.format('YYYY-MM-DD')}`,
      });
    }
  };

  const onTodayBtnClick = () => {
    setALLPopupsUnvisible();
    setRowDate(null);

    if (location.pathname === '/schedule/range') {
      const start: moment.Moment = moment().clone().startOf('month');
      const end: moment.Moment = moment().clone().endOf('month');
      setStartOFRange(moment(start, 'YYYY-MM-DD'));
      setEndOFRange(moment(end, 'YYYY-MM-DD'));

      history.push({
        search: `start=${start.format('YYYY-MM-DD')}&end=${end.format(
          'YYYY-MM-DD'
        )}`,
      });
    } else if (location.pathname === '/day') {
      const today: moment.Moment = moment();
      setDate(moment(today, 'YYYY-MM-DD'));

      history.push({
        search: `?date=${today.format('YYYY-MM-DD')}`,
      });
    }
  };

  const onNextBtnClick = () => {
    setALLPopupsUnvisible();
    setRowDate(null);

    if (location.pathname === '/schedule/range') {
      const start: moment.Moment = startOfRange.clone().add(1, 'week');
      const end: moment.Moment = endOfRange.clone().add(1, 'week');
      setStartOFRange(moment(start, 'YYYY-MM-DD'));
      setEndOFRange(moment(end, 'YYYY-MM-DD'));

      history.push({
        search: `start=${start.format('YYYY-MM-DD')}&end=${end.format(
          'YYYY-MM-DD'
        )}`,
      });
    } else if (location.pathname === '/day') {
      const nextDay: moment.Moment = date.clone().add(1, 'day');
      setDate(moment(nextDay, 'YYYY-MM-DD'));

      history.push({
        search: `?date=${nextDay.format('YYYY-MM-DD')}`,
      });
    }
  };

  return (
    <div className='gridnav control-panel__gridnav'>
      <button
        onClick={onPrevBtnClick}
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
        className='gridnav__btn gridnav__btn_next'
        title='Следующий период'
      >
        <img className='gridnav__btn-img' src={rightBtnImg} alt='>' />
      </button>
    </div>
  );
};

export default React.memo(GridNav);
