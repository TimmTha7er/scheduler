import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  // setVisible,
  // setDate,
  // setALLPopupsUnvisible,
  // setRowDate,
  signout,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
// import { useClickOutside } from '../supports/hooks';
// import { GridNav, DatePicker, RangeBtn } from '../../components';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../img/header-logo-cat-2.svg';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const {
    // datePicker: { date, isVisible },
    auth: { authenticated },
  } = useSelector((state: RootState) => state);
  // const history = useHistory();
  // const selectedMonth: string = date.format('MMMM');
  // const selectedYear: string = date.format('YYYY');

  // const onSelectedDateClick = (): void => {
  //   dispatch(setVisible(!isVisible));
  //   dispatch(setALLPopupsUnvisible());
  //   dispatch(setRowDate(null));
  // };

  // const setDatePickerDate = useCallback(
  //   (date: moment.Moment) => {
  //     history.push({
  //       pathname: `/day`,
  //       search: `?date=${date.format('YYYY-MM-DD')}`,
  //     });

  //     return dispatch(setDate(date));
  //   },
  //   [dispatch, history]
  // );

  // const setGridDate = useCallback(
  //   (date: moment.Moment) => {
  //     return dispatch(setDate(date));
  //   },
  //   [dispatch]
  // );

  // const setVisibleCallback = useCallback(
  //   (value: boolean) => dispatch(setVisible(value)),
  //   [dispatch]
  // );
  // const datePickerRef = useClickOutside(setVisibleCallback);

  const onLogoutClick = () => {
    dispatch(signout());
  };

  return (
    <header className='header'>
      <div className='header__top-line'>
        <a href='/' className='header__logo logo link'>
          <img className='logo__img' src={logoImg} alt='logo cat' />
          <div className='logo__text'>
            <h4 className='logo__subtitle'>Мурр-Мяуу</h4>
            <h1 className='logo__title'>Календарь</h1>
          </div>
        </a>
        <div className='user-bar'>
          {!authenticated ? (
            <div className='buttons'>
              <Link to='/sign-up' className='user-bar__sing-up-btn button link'>
                Регистрация
              </Link>
              <Link to='/sign-in' className='user-bar__sing-in-btn button link'>
                Войти
              </Link>
            </div>
          ) : (
            <button
              onClick={onLogoutClick}
              className='user-bar__sing-out-btn button link'
            >
              Выйти
            </button>
          )}
        </div>
      </div>

      {/* <div className='header__bot-line'>
        <div ref={datePickerRef} className='header__date-wrap'>
          <div onClick={onSelectedDateClick} className='header__selected-date'>
            <div className='header__selected-month'>{selectedMonth}</div>
            <div className='header__selected-year'>{selectedYear}</div>
          </div>
          <div className='datepicker__wrap'>
            {isVisible && (
              <DatePicker
                date={date}
                setDate={setDatePickerDate}
                owner={'header'}
                setVisible={setVisibleCallback}
              ></DatePicker>
            )}
          </div>
        </div>
        <div className='header__btns-wrap'>
          <GridNav setDate={setGridDate}></GridNav>
          <RangeBtn></RangeBtn>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
