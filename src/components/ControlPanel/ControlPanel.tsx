import React, { useCallback } from 'react';
import {
  useActions,
  useClickOutside,
  useRouter,
  useTypedSelector,
} from '../supports/Hooks/';
import {
  GridNav,
  DatePicker,
  RangeBtn,
  ControlPanelLoader,
} from '../../components';

const ControlPanel: React.FC = () => {
  const {
    setVisible,
    setDate,
    setALLPopupsUnvisible,
    setRowDate,
  } = useActions();
  const {
    datePicker: { date, isVisible },
    auth: { loading },
  } = useTypedSelector((state) => state);
  const { history } = useRouter();
  const selectedMonth: string = date.format('MMMM');
  const selectedYear: string = date.format('YYYY');

  const onSelectedDateClick = (): void => {
    setVisible(!isVisible);
    setALLPopupsUnvisible();
    setRowDate(null);
  };

  const setDatePickerDate = useCallback((date: moment.Moment) => {
    history.push({
      pathname: `/day`,
      search: `?date=${date.format('YYYY-MM-DD')}`,
    });

    return setDate(date);
  }, []);

  const setGridDate = useCallback((date: moment.Moment) => {
    return setDate(date);
  }, []);

  const setVisibleCallback = useCallback(
    (value: boolean) => setVisible(value),
    []
  );
  const datePickerRef = useClickOutside(setVisibleCallback);

  if (loading) {
    return <ControlPanelLoader />;
  }

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
