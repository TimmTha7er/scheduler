import React from 'react';
import { useInput } from '../supports/hooks';
import Range from './Range';
import NextDays from './NextDays';
import NextEvents from './NextEvents';

const ScheduleRange: React.FC = () => {
  const input = useInput('schedule');

  return (
    <div className='schedule-range'>
      {/* <form className='schedule-range__date-range'> */}
      <div>
        <form className='radio-group'>
          <input
            className='radio-group__input visually-hidden'
            type='radio'
            value='schedule'
            id='schedule'
            name='range-radio-btn'
            onChange={input.onChange}
            defaultChecked
          />
          <input
            className='radio-group__input visually-hidden'
            type='radio'
            value='n-days'
            id='n-days'
            name='range-radio-btn'
            onChange={input.onChange}
          />
          <input
            className='radio-group__input visually-hidden'
            type='radio'
            value='n-events'
            id='n-events'
            name='range-radio-btn'
            onChange={input.onChange}
          />

          <div className='schedule-range__btns'>
            <label
              className='radio-group__label radio-group__label_active'
              htmlFor='schedule'
            >
              <span className='radio-group__text'>Промежуток</span>
            </label>

            <label className='radio-group__label' htmlFor='n-days'>
              <span className='radio-group__text'>Ближайшие n дней</span>
            </label>

            <label className='radio-group__label' htmlFor='n-events'>
              <span className='radio-group__text'>Ближайшие n соытий</span>
            </label>
          </div>
        </form>
      </div>

      {input.value === 'schedule' && <Range></Range>}
      {input.value === 'n-days' && <NextDays></NextDays>}
      {input.value === 'n-events' && <NextEvents></NextEvents>}
      {/* <DayList></DayList> */}
    </div>
  );
};

export default ScheduleRange;
