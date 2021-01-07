import { connect } from 'react-redux';

const buildRange = (events, startDay, endDay) => {
  // console.log('startDay', startDay);
  // console.log('endDay', endDay);

  const day = startDay.clone().subtract(1, 'day');
  const range = [];
  let dayEvents = [];

  while (day.isBefore(endDay, 'day')) {
    const startHour = day.clone().startOf('day').startOf('hour');
    const endHour = day.clone().endOf('day').endOf('hour');
    const hour = startHour.clone().subtract(1, 'hour');

    while (hour.isBefore(endHour, 'hour')) {
      if (events[hour]) {
        dayEvents.push({ ...events[hour], time: hour.clone() });
      }

      hour.add(1, 'hour');
    }

    if (dayEvents.length > 0) {
      range.push(dayEvents);
      dayEvents = [];
    }

    day.add(1, 'day');
  }


  // console.log('range', range);

  return range;
};

const ScheduleRange = ({ date, events }) => {
  const start = date.clone().subtract(1, 'week');
  const end = date.clone().add(1, 'week');

  const range = buildRange(events, start, end);

  return (
    <div className='schedule-range'>
      <form className='schedule-range__date-range'>
        <div className='schedule-range__label'>Промежуток</div>
        <input type='text' className='schedule-range__input' />
        <span>一</span>
        <input type='text' className='schedule-range__input' />
      </form>
      <div className='schedule-range__day-list'>
        {range.map((day, idx) => {
          return (
            <div key={idx} className='schedule-range__day'>
              <div className='schedule-range__date'>
                <span className='schedule-range__dayOfMonth'>31</span>
                <span className='schedule-range__month'>декабря</span>
                <span className='schedule-range__year'>2020</span>
                <div className='schedule-range__dayOfWeek'>четверг</div>
              </div>
              <div className='schedule-range__event-list'>
                {day.map(({ time, title }, idx) => {
                  const start = time.clone().format('HH:mm');
                  const end = time.clone().add(1, 'hour').format('HH:mm');

                  return (
                    <div key={idx} className='schedule-range__event'>
                      <div className='schedule-range__time'>
                        {start}
                        &mdash;
                        {end}
                      </div>
                      <div className='schedule-range__circle'></div>
                      <div className='schedule-range__event-title'>{title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ datePicker: { date }, grid: { events } }) => {
  return { date, events };
};

const mapDistatchToProps = {};

export default connect(mapStateToProps, mapDistatchToProps)(ScheduleRange);
