const ScheduleRange = () => {
  return (
    <div className='schedule-range'>
      <form className='schedule-range__date-range'>
        <div className='schedule-range__label'>Промежуток</div>
        <input type='text' className='schedule-range__input' />
        <span>一</span>
        <input type='text' className='schedule-range__input' />
      </form>
      <div className='schedule-range__day-list'>
        <div className='schedule-range__day'>
          <div className='schedule-range__date'>
            <span className='schedule-range__dayOfMonth'>31</span>
            <span className='schedule-range__month'>декабря</span>
            <span className='schedule-range__year'>2020</span>
            <div className='schedule-range__dayOfWeek'>четверг</div>
          </div>
          <div className='schedule-range__event-list'>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
          </div>
        </div>
        <div className='schedule-range__day'>
          <div className='schedule-range__date'>
            <span className='schedule-range__dayOfMonth'>31</span>
            <span className='schedule-range__month'>декабря</span>
            <span className='schedule-range__year'>2020</span>
            <div className='schedule-range__dayOfWeek'>четверг</div>
          </div>
          <div className='schedule-range__event-list'>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
            <div className='schedule-range__event'>
              <div className='schedule-range__time'>09:30–10:00</div>
              <div className='schedule-range__circle'></div>
              <div className='schedule-range__event-title'>Мое событие</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleRange;