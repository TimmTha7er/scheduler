import React, { useState } from 'react';
import { Calendar, SelectedDate } from '../../components';
import leftBtnImg from '../../img/angle-left.svg';
import rightBtnImg from '../../img/angle-right.svg';

const daysList: Array<string> = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

type DatePickerProps = {
  date: moment.Moment;
  setDate: (day: moment.Moment) => object;
  setVisible: (value: boolean) => object;
  owner: string;
};

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  setDate,
  setVisible,
  owner,
}) => {
  const [value, setValue] = useState<moment.Moment>(date);

  const prevMonth = (): moment.Moment => {
    return value.clone().subtract(1, 'month');
  };

  const nextMonth = (): moment.Moment => {
    return value.clone().add(1, 'month');
  };

  const onBtnPrevClick = (): void => {
    setValue(prevMonth());
  };

  const onBtnNextClick = (): void => {
    setValue(nextMonth());
  };

  const onDayClick = (day: moment.Moment) => (): void => {
    setValue(day);
    setDate(day);
    setVisible(false);
  };

  const onChangeMonth = (month: moment.Moment): void => {
    setValue(month);
  };

  const onChangeYear = (year: moment.Moment): void => {
    setValue(year);
  };

  return (
    <div className={`datepicker ${owner}__datepicker`}>
      <div className='datepicker__header'>
        <button
          onClick={onBtnPrevClick}
          type='button'
          // className='datepicker__month-navigation datepicker__month-navigation_previous icon icon-left-open-big'
          className='datepicker__month-navigation datepicker__month-navigation_previous'
        >
          <img src={leftBtnImg} alt='<' />
        </button>
        <button
          onClick={onBtnNextClick}
          type='button'
          // className='datepicker__month-navigation datepicker__month-navigation_next icon icon-right-open-big'
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

export default DatePicker;
