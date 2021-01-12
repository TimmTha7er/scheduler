import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setStartOFRange,
  setEndOFRange,
  setLeftDatePickerVisible,
  setRightDatePickerVisible,
} from '../../redux/actions';
import { RootState } from '../../redux/reducers/index';
import { GridActionsType } from '../../redux/actions/range';
import DatePicker from '../DatePicker/DatePicker';
import DayList from './DayList';

type ScheduleRangeProps = {
  startOfRange: moment.Moment;
  endOfRange: moment.Moment;
  setStartOFRange: (date: moment.Moment) => GridActionsType;
  setEndOFRange: (date: moment.Moment) => GridActionsType;
  isLeftDatePickerVisible: boolean;
  isRightDatePickerVisible: boolean;
  setRightDatePickerVisible: (value: boolean) => GridActionsType;
  setLeftDatePickerVisible: (value: boolean) => GridActionsType;
};

const ScheduleRange: React.FC<ScheduleRangeProps> = ({
  startOfRange,
  endOfRange,
  setStartOFRange,
  setEndOFRange,
  isLeftDatePickerVisible,
  isRightDatePickerVisible,
  setRightDatePickerVisible,
  setLeftDatePickerVisible,
}) => {
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => document.body.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleOutsideClick = (e: any) => {
    if (e.path && !e.path.includes(datePickerRef.current)) {
      setLeftDatePickerVisible(false);
      setRightDatePickerVisible(false);
    }
    // if (!datePickerRef.current?.contains(e.target)) {
    //   setLeftDatePickerVisible(false);
    //   setRightDatePickerVisible(false);
    // }
  };

  const onStartDateClick = (): void => {
    setRightDatePickerVisible(false);
    setLeftDatePickerVisible(!isLeftDatePickerVisible);
  };

  const onEndDateClick = (): void => {
    setLeftDatePickerVisible(false);
    setRightDatePickerVisible(!isRightDatePickerVisible);
  };

  return (
    <div className='schedule-range'>
      <form className='schedule-range__date-range'>
        <div ref={datePickerRef} className='schedule-range__range-wrap'>
          <div className='schedule-range__label'>Расписание:</div>

          <div className='schedule-range__date-block'>
            <div className='schedule-range__date-wrap'>
              <div
                onClick={onStartDateClick}
                className='schedule-range__start-date'
              >
                {startOfRange.format('DD-MM-YYYY')}
              </div>
              {isLeftDatePickerVisible && (
                <DatePicker
                  owner={'schedule-range'}
                  date={startOfRange}
                  setDate={setStartOFRange}
                  setVisible={setLeftDatePickerVisible}
                ></DatePicker>
              )}
            </div>

            <span className='schedule-range__dash'>一</span>

            <div className='schedule-range__date-wrap'>
              <div
                onClick={onEndDateClick}
                className='schedule-range__end-date'
              >
                {endOfRange.format('DD-MM-YYYY')}
              </div>
              {isRightDatePickerVisible && (
                <DatePicker
                  owner={'schedule-range'}
                  date={endOfRange}
                  setDate={setEndOFRange}
                  setVisible={setRightDatePickerVisible}
                ></DatePicker>
              )}
            </div>
          </div>
        </div>
      </form>

      <DayList></DayList>
    </div>
  );
};

const mapStateToProps = ({
  range: {
    startOfRange,
    endOfRange,
    isLeftDatePickerVisible,
    isRightDatePickerVisible,
  },
}: RootState) => {
  return {
    startOfRange,
    endOfRange,
    isLeftDatePickerVisible,
    isRightDatePickerVisible,
  };
};

const mapDistatchToProps = {
  setStartOFRange,
  setEndOFRange,
  setLeftDatePickerVisible,
  setRightDatePickerVisible,
};

export default connect(mapStateToProps, mapDistatchToProps)(ScheduleRange);
