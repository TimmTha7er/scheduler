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
import { push } from 'connected-react-router';

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch();
  const {
    datePicker: { date, isVisible },
  } = useSelector((state: RootState) => state);
  const selectedMonth: string = date.format('MMMM');
  const selectedYear: string = date.format('YYYY');

  const onSelectedDateClick = (): void => {
    dispatch(setVisible(!isVisible));
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));
  };

  const setDatePickerDate = useCallback(
    (date: moment.Moment) => {
      dispatch(
        push({
          pathname: `/day`,
          search: `?date=${date.format('YYYY-MM-DD')}`,
        })
      );

      return dispatch(setDate(date));
    },
    [dispatch]
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
    <div className='control-panel'>
      <div ref={datePickerRef} className='control-panel__date-wrap'>
        <div
          onClick={onSelectedDateClick}
          className='control-panel__selected-date'
        >
          <div className='control-panel__selected-month'>{selectedMonth}</div>
          <div className='control-panel__selected-year'>{selectedYear}</div>
        </div>
        <div className='datepicker__wrap'>
          {isVisible && (
            <DatePicker
              className='control-panel__datepicker'
              date={date}
              setDate={setDatePickerDate}
              setVisible={setVisibleCallback}
            ></DatePicker>
          )}
        </div>
      </div>
      <div className='control-panel__btns-wrap'>
        <GridNav setDate={setGridDate}></GridNav>
        <RangeBtn></RangeBtn>
      </div>
    </div>
  );
};

export default ControlPanel;
