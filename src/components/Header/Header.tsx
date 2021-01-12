import React, { useRef, useEffect, useCallback } from 'react';
import { GridNav, DatePicker, RangeBtn } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  setVisible,
  setDate,
  setALLPopupsUnvisible,
} from '../../redux/actions';
import { RootState } from '../../redux/reducers/index';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { date, isVisible } = useSelector(
    (state: RootState) => state.datePicker
  );

  const datePickerRef = useRef<HTMLDivElement>(null);
  const selectedMonth: string = date.format('MMMM');
  const selectedYear: string = date.format('YYYY');

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e: any): void => {
    if (e.path && !e.path.includes(datePickerRef.current)) {
      dispatch(setVisible(false));
    }
    // !!!!
    // https://youtu.be/GtaKTDNQ6vo?t=938
    // https://www.youtube.com/watch?v=_Jh60EKcvPA
    // !!!!
    // if (!datePickerRef.current?.contains(e.target)) {
    //   setVisible(false);
    // }
  };

  const onSelectedDateClick = (): void => {
    dispatch(setVisible(!isVisible));
    dispatch(setALLPopupsUnvisible());
  };

  const setDateCallback = useCallback(
    (date: moment.Moment) => dispatch(setDate(date)),
    [dispatch]
  );

  const setVisibleCallback = useCallback(
    (value: boolean) => dispatch(setVisible(value)),
    [dispatch]
  );

  return (
    <header className='header'>
      <div ref={datePickerRef} className='header__date-wrap'>
        <div onClick={onSelectedDateClick} className='header__selected-date'>
          <div className='header__selected-month'>{selectedMonth}</div>
          <div className='header__selected-year'>{selectedYear}</div>
        </div>
        {isVisible && (
          <DatePicker
            date={date}
            setDate={setDateCallback}
            owner={'header'}
            setVisible={setVisibleCallback}
          ></DatePicker>
        )}
      </div>
      <div className='header__btns-wrap'>
        <GridNav setDate={setDateCallback}></GridNav>
        <RangeBtn></RangeBtn>
      </div>
    </header>
  );
};

export default Header;
