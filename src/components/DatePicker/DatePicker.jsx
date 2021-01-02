// import React from 'react';
const monthList = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

const dayList = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const DatePicker = ({ selectedMonth, selectedYear }) => {
  const startYear = selectedYear - 5;
  const endYear = selectedYear + 5;
  const yearList = Array(endYear - startYear + 1)
    .fill()
    .map((item, idx) => endYear - idx);

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
          <div className='datepicker__selected-month'>декабрь</div>
          <div className='datepicker__selected-year'>2020</div>

          <div className='datepicker__month-dropdown'>
            {monthList.map((item, idx) => {
              const className =
                item === selectedMonth
                  ? 'datepicker__month-name datepicker__month-name_selected'
                  : 'datepicker__month-name';
              return (
                <div key={idx} className={className}>
                  {item}
                </div>
              );
            })}
          </div>

          <div className='datepicker__year-dropdown'>
            <div className='datepicker__year-option'>
              <a className='datepicker__navigation datepicker__navigation_years-upcoming icon icon-up-open-big'></a>
            </div>
            {yearList.map((item, idx) => {
              const className =
                item === selectedYear
                  ? 'datepicker__year-option datepicker__year-option_selected'
                  : 'datepicker__year-option';
              return (
                <div key={idx} className={className}>
                  {item}
                </div>
              );
            })}
            <div className='datepicker__year-option'>
              <a className='datepicker__navigation datepicker__navigation_years-previous icon icon-down-open-big'></a>
            </div>
          </div>
        </div>
        <div className='datepicker__day-names'>
          {dayList.map((item, idx) => {
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
