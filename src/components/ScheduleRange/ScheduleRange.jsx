import { connect } from 'react-redux';
import { setPreviewPopupVisible, setRowDate, setRange } from '../../redux/actions';
import DatePicker from '../DatePicker/DatePicker.jsx';

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
      range.push({ day: dayEvents, time: day.clone() });
      dayEvents = [];
    }

    day.add(1, 'day');
  }

  // console.log('range', range);

  return range;
};

const ScheduleRange = ({
  date,
  events,
  startOfRange,
  endOfRange,
  setPreviewPopupVisible,
  setRowDate,
}) => {
  const range = buildRange(events, startOfRange, endOfRange);

  const onEventClick = (time) => () => {
    setRowDate(time);
    setPreviewPopupVisible(true);
  };

  return (
    <div className='schedule-range'>
      <form className='schedule-range__date-range'>
        <div className='schedule-range__label'>Расписание</div>
        <input
          type='text'
          className='schedule-range__input'
          defaultValue={startOfRange.format('DD-MM-YYYY')}
        />
        <span className='schedule-range__dash'>一</span>
        <input
          type='text'
          className='schedule-range__input'
          defaultValue={endOfRange.format('DD-MM-YYYY')}
        />

        {/* {<DatePicker></DatePicker>} */}
      </form>
      <div className='schedule-range__day-list'>
        {range.map(({ day, time }, idx) => {
          const dayOfMonth = time.clone().format('DD');
          const month = time.clone().format('LL').split(' ')[1];
          const year = time.clone().format('YYYY');
          const dayOfWeek = time.clone().format('dddd');

          return (
            <div key={idx} className='schedule-range__day'>
              <div className='schedule-range__date'>
                <span className='schedule-range__dayOfMonth'>{dayOfMonth}</span>
                <span className='schedule-range__month'>{month}</span>
                <span className='schedule-range__year'>{year}</span>
                <div className='schedule-range__dayOfWeek'>{dayOfWeek}</div>
              </div>
              <div className='schedule-range__event-list'>
                {day.map(({ time, title }, idx) => {
                  const start = time.clone().format('HH:mm');
                  const end = time.clone().add(1, 'hour').format('HH:mm');

                  return (
                    <div
                      onClick={onEventClick(time)}
                      key={idx}
                      className='schedule-range__event'
                    >
                      <div className='schedule-range__time'>
                        {start}
                        &mdash;
                        {end}
                      </div>
                      <div className='schedule-range__circle'></div>
                      <div className='schedule-range__event-title'>
                        <span className='schedule-range__title-inner'>
                          {title}
                        </span>
                      </div>
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

const mapStateToProps = ({
  datePicker: { date },
  grid: { events },
  range: { startOfRange, endOfRange },
}) => {
  return { date, events, startOfRange, endOfRange };
};

const mapDistatchToProps = { setPreviewPopupVisible, setRowDate };

export default connect(mapStateToProps, mapDistatchToProps)(ScheduleRange);
