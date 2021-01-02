import { useState, useRef, useEffect } from 'react';
import YearDropdown from './YearDropdown';
import MonthDropdown from './MonthDropdown';

const daysList = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const DatePicker = ({ selectedMonth, selectedYear }) => {
  const [visibleMonthDropdown, setVisibleMonthDropdown] = useState(false);
  const [visibleYearDropdown, setVisibleYearDropdown] = useState(false);
  const monthRef = useRef();
  const yearRef = useRef();

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
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

  return (
    <div className='datepicker header__datepicker'>
      <div className='datepicker__header'>
        <button
          type='button'
          className='datepicker__month-navigation datepicker__month-navigation_previous icon icon-left-open-big'
        ></button>
        <button
          type='button'
          className='datepicker__month-navigation datepicker__month-navigation_next icon icon-right-open-big'
        ></button>

        <div className='datepicker__selected-date'>
          <div ref={monthRef} className='datepicker__selected-month-wrap'>
            <span
              className='datepicker__selected-month'
              onClick={onSelectedMonthClick}
            >
              {selectedMonth}
            </span>

            {visibleMonthDropdown && (
              <MonthDropdown selectedMonth={selectedMonth}></MonthDropdown>
            )}
          </div>
          <div ref={yearRef} className='datepicker__selected-year-wrap'>
            <span
              onClick={onSelectedYearClick}
              className='datepicker__selected-year'
            >
              {selectedYear}
            </span>

            {visibleYearDropdown && (
              <YearDropdown selectedYear={selectedYear}></YearDropdown>
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
        <div className='datepicker__week'>
          <div className='datepicker__day datepicker__day_outside-month'>
            30
          </div>
          <div className='datepicker__day'>1</div>
          <div className='datepicker__day'>2</div>
          <div className='datepicker__day'>3</div>
          <div className='datepicker__day'>4</div>
          <div className='datepicker__day datepicker__day_weekend'>5</div>
          <div className='datepicker__day datepicker__day_weekend'>6</div>
        </div>
        <div className='datepicker__week'>
          <div className='datepicker__day'>7</div>
          <div className='datepicker__day'>8</div>
          <div className='datepicker__day'>9</div>
          <div className='datepicker__day'>10</div>
          <div className='datepicker__day'>11</div>
          <div className='datepicker__day datepicker__day_weekend'>12</div>
          <div className='datepicker__day datepicker__day_weekend'>13</div>
        </div>
        <div className='datepicker__week'>
          <div className='datepicker__day'>14</div>
          <div className='datepicker__day'>15</div>
          <div className='datepicker__day'>16</div>
          <div className='datepicker__day'>17</div>
          <div className='datepicker__day'>18</div>
          <div className='datepicker__day datepicker__day_weekend'>19</div>
          <div className='datepicker__day datepicker__day_weekend'>20</div>
        </div>
        <div className='datepicker__week'>
          <div className='datepicker__day'>21</div>
          <div className='datepicker__day'>22</div>
          <div className='datepicker__day'>23</div>
          <div className='datepicker__day'>24</div>
          <div className='datepicker__day'>25</div>
          <div className='datepicker__day datepicker__day_weekend'>26</div>
          <div className='datepicker__day datepicker__day_weekend'>27</div>
        </div>
        <div className='datepicker__week'>
          <div className='datepicker__day datepicker__day_selected'>28</div>
          <div className='datepicker__day datepicker__day_selected datepicker__day_today'>
            29
          </div>
          <div className='datepicker__day'>30</div>
          <div className='datepicker__day'>31</div>
          <div className='datepicker__day datepicker__day_outside-month'>1</div>
          <div className='datepicker__day datepicker__day_outside-month'>2</div>
          <div className='datepicker__day datepicker__day_outside-month'>3</div>
        </div>
        <div className='datepicker__week'>
          <div className='datepicker__day datepicker__day_outside-month'>4</div>
          <div className='datepicker__day datepicker__day_outside-month'>5</div>
          <div className='datepicker__day datepicker__day_outside-month'>6</div>
          <div className='datepicker__day datepicker__day_outside-month'>7</div>
          <div className='datepicker__day datepicker__day_outside-month'>8</div>
          <div className='datepicker__day datepicker__day_outside-month'>9</div>
          <div className='datepicker__day datepicker__day_outside-month'>
            10
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
