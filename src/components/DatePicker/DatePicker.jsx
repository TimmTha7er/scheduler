import { useState, useRef, useEffect } from 'react';
import YearDropdown from './YearDropdown';
import MonthDropdown from './MonthDropdown';
import buildCalendar from './buildCalendar';
// import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { setDate, setVisible } from '../../redux/actions';

const daysList = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const DatePicker = ({ date, setDate, setVisible }) => {
  const [visibleMonthDropdown, setVisibleMonthDropdown] = useState(false);
  const [visibleYearDropdown, setVisibleYearDropdown] = useState(false);
  const monthRef = useRef();
  const yearRef = useRef();

  // calendar
  // ---------------------------
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(date);
  const today = date;

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  // const isSelected = (day) => {
  //   return value.isSame(day, 'day');
  // }

  // const beforeToday = (day) => {
  //   return day.isBefore(new Date(), 'day');
  // }

  // const afterToday = (day) => {
  //   return day.isAfter(new Date(), 'day');
  // }

  // const isToday = (day) => {
  //   return day.isSame(new Date(), 'day');
  // }

  const currYear = () => {
    return value.format('YYYY');
  };

  const currMonthName = () => {
    return value.format('MMMM');
  };

  const prevMonth = () => {
    return value.clone().subtract(1, 'month');
  };

  const nextMonth = () => {
    return value.clone().add(1, 'month');
  };

  const onBtnPrevClick = () => {
    // setCalendar(buildCalendar(prevMonth()));
    setValue(prevMonth());
  };

  const onBtnNextClick = () => {
    // setCalendar(buildCalendar(nextMonth()));
    setValue(nextMonth());
  };

  // const currMonth = () => {
  //   return value.clone().format('YYYY');
  // }

  // ---------------------------
  // calendar

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      // ???
      setVisibleMonthDropdown(false);
      setVisibleYearDropdown(false);
    };
  }, []);

  const handleOutsideClick = (e) => {
    if (!e.path.includes(monthRef.current)) {
      setVisibleMonthDropdown(false);
    }
    if (!e.path.includes(yearRef.current)) {
      setVisibleYearDropdown(false);
    }
  };

  const onSelectedMonthClick = () => {
    setVisibleMonthDropdown((prevState) => !prevState);
  };

  const onSelectedYearClick = () => {
    setVisibleYearDropdown((prevState) => !prevState);
  };

  // console.log('value', value);

  const onDayClick = (day) => () => {
    console.log(day);
    setValue(day);
    setDate(day);
    setVisible(false);
  };

  const onChangeMonth = (month) => {
    setValue(month);
    onSelectedMonthClick();
  };

  const onChangeYear = (year) => {
    setValue(year);
    onSelectedYearClick();
  };

  return (
    <div className='datepicker header__datepicker'>
      <div className='datepicker__header'>
        <button
          onClick={onBtnPrevClick}
          type='button'
          className='datepicker__month-navigation datepicker__month-navigation_previous icon icon-left-open-big'
        ></button>
        <button
          onClick={onBtnNextClick}
          type='button'
          className='datepicker__month-navigation datepicker__month-navigation_next icon icon-right-open-big'
        ></button>

        <div className='datepicker__selected-date'>
          <div ref={monthRef} className='datepicker__selected-month-wrap'>
            <span
              className='datepicker__selected-month'
              onClick={onSelectedMonthClick}
            >
              {currMonthName()}
            </span>

            {visibleMonthDropdown && (
              <MonthDropdown
                onChangeMonth={onChangeMonth}
                date={value}
              ></MonthDropdown>
            )}
          </div>
          <div ref={yearRef} className='datepicker__selected-year-wrap'>
            <span
              onClick={onSelectedYearClick}
              className='datepicker__selected-year'
            >
              {currYear()}
            </span>

            {visibleYearDropdown && (
              <YearDropdown
                onChangeYear={onChangeYear}
                date={value}
              ></YearDropdown>
            )}
          </div>
        </div>
        <div className='datepicker__day-names'>
          {daysList.map((item, idx) => {
            return (
              <div key={idx} className='datepicker__day-name'>
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className='datepicker__month'>
        {calendar.map((week, idx) => (
          <div key={idx} className='datepicker__week'>
            {week.map((day, idx) => {
              const className = classNames({
                datepicker__day_selected: value.isSame(day),
                datepicker__day_today: today.isSame(day, 'day'),
                datepicker__day_weekend:
                  day.format('dd') === 'вс' || day.format('dd') === 'сб',
                'datepicker__day_outside-month':
                  day.isAfter(value, 'month') || day.isBefore(value, 'month'),
              });

              return (
                <div
                  onClick={onDayClick(day)}
                  key={idx}
                  className={`datepicker__day ${className}`}
                >
                  {day.format('D')}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log('state', state.datePicker.date);

  return { date: state.datePicker.date };
};

const mapDistatchToProps = {
  setDate: setDate,
  setVisible: setVisible,
};

export default connect(mapStateToProps, mapDistatchToProps)(DatePicker);
