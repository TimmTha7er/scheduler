import React, { useCallback } from 'react';
import { GridNav, DatePicker, RangeBtn } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  setVisible,
  setDate,
  setALLPopupsUnvisible,
  setRowDate,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { useClickOutside } from '../supports/hooks';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { date, isVisible } = useSelector(
    (state: RootState) => state.datePicker
  );

  const selectedMonth: string = date.format('MMMM');
  const selectedYear: string = date.format('YYYY');

  const onSelectedDateClick = (): void => {
    dispatch(setVisible(!isVisible));
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));
  };

  const setDateCallback = useCallback(
    (date: moment.Moment) => dispatch(setDate(date)),
    [dispatch]
  );

  const setVisibleCallback = useCallback(
    (value: boolean) => dispatch(setVisible(value)),
    [dispatch]
  );
  const datePickerRef = useClickOutside(setVisibleCallback);

  return (
    <header className='header'>
      <div ref={datePickerRef} className='header__date-wrap'>
        <div className='header__selected-date'>
          <div onClick={onSelectedDateClick} className='header__selected-month'>
            {selectedMonth}
          </div>
          <div onClick={onSelectedDateClick} className='header__selected-year'>
            {selectedYear}
          </div>
        </div>
        <div className='datepicker__wrap'>
          {isVisible && (
            <DatePicker
              date={date}
              setDate={setDateCallback}
              owner={'header'}
              setVisible={setVisibleCallback}
            ></DatePicker>
          )}
        </div>
      </div>
      <div className='header__btns-wrap'>
        <GridNav setDate={setDateCallback}></GridNav>
        <RangeBtn></RangeBtn>
      </div>
    </header>
  );
};

export default Header;
