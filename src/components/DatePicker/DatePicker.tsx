import React, { useState, useCallback } from 'react';
import { Calendar, SelectedDate } from '../../components';
import leftBtnImg from '../../img/angle-left.svg';
import rightBtnImg from '../../img/angle-right.svg';

const daysList: Array<string> = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

interface DatePickerProps {
  date: moment.Moment;
  setDate: (day: moment.Moment) => object;
  setVisible: (value: boolean) => object;
  className: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  setDate,
  setVisible,
  className,
}) => {
  const [value, setValue] = useState<moment.Moment>(date);

  const onBtnPrevClick = (): void => {
    const prevMonth: moment.Moment = value.clone().subtract(1, 'month');
    setValue(prevMonth);
  };

  const onBtnNextClick = (): void => {
    const nextMonth: moment.Moment = value.clone().add(1, 'month');
    setValue(nextMonth);
  };

  const onDayClick = useCallback(
    (day: moment.Moment) => (): void => {
      setValue(day);
      setDate(day);
      setVisible(false);
    },
    [setDate, setVisible]
  );

  const onChangeMonth = useCallback(
    (month: moment.Moment): void => setValue(month),
    []
  );

  const onChangeYear = useCallback(
    (year: moment.Moment): void => setValue(year),
    []
  );

  return (
    <div className={`datepicker ${className}`}>
      <div className='datepicker__header'>
        <button
          onClick={onBtnPrevClick}
          type='button'
          className='datepicker__month-navigation datepicker__month-navigation_previous'
        >
          <img src={leftBtnImg} alt='<' />
        </button>
        <button
          onClick={onBtnNextClick}
          type='button'
          className='datepicker__month-navigation datepicker__month-navigation_next'
        >
          <img src={rightBtnImg} alt='>' />
        </button>

        <SelectedDate
          value={value}
          onChangeMonth={onChangeMonth}
          onChangeYear={onChangeYear}
        ></SelectedDate>

        <div className='datepicker__day-names'>
          {daysList.map((item: string, idx: number) => {
            return (
              <div key={idx} className='datepicker__day-name'>
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <Calendar value={value} onDayClick={onDayClick}></Calendar>
    </div>
  );
};

export default React.memo(DatePicker);
