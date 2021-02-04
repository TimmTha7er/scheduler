import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setVisible,
  setDate,
  setALLPopupsUnvisible,
  setRowDate,
} from '../../redux/actions';
import { RootState } from '../../redux/store';
import { useClickOutside } from '../supports/hooks';
import { GridNav, DatePicker, RangeBtn } from '../../components';
import { useHistory } from 'react-router-dom';

const HeaderBottom: React.FC = () => {
  const dispatch = useDispatch();
  const {
    datePicker: { date, isVisible },
  } = useSelector((state: RootState) => state);
  const history = useHistory();
  const selectedMonth: string = date.format('MMMM');
  const selectedYear: string = date.format('YYYY');

  const onSelectedDateClick = (): void => {
    dispatch(setVisible(!isVisible));
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));
  };

  const setDatePickerDate = useCallback(
    (date: moment.Moment) => {
      history.push({
        pathname: `/day`,
        search: `?date=${date.format('YYYY-MM-DD')}`,
      });

      return dispatch(setDate(date));
    },
    [dispatch, history]
  );

  const setGridDate = useCallback(
    (date: moment.Moment) => {
      return dispatch(setDate(date));
    },
    [dispatch]
  );

  const setVisibleCallback = useCallback(
    (value: boolean) => dispatch(setVisible(value)),
    [dispatch]
  );
  const datePickerRef = useClickOutside(setVisibleCallback);

  return (
    <div className='header__bot-line'>
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
    </div>
  );
};

export default HeaderBottom;
