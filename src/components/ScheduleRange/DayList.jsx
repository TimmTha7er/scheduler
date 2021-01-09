import { connect } from 'react-redux';
import { setPreviewPopupVisible, setRowDate } from '../../redux/actions';

const buildRange = (events, startDay, endDay) => {
  let start = startDay.clone();
  let end = endDay.clone().add(1, 'day');

  if (startDay.isSameOrAfter(endDay)) {
    end = startDay.clone().add(1, 'day');
    start = endDay.clone();
  }

  const day = start.clone();
  const range = [];
  let dayEvents = [];

  while (day.isBefore(end, 'day')) {
    const startHour = day.clone().startOf('day').startOf('hour');
    const endHour = day.clone().endOf('day').endOf('hour');
    const hour = startHour.clone();

    while (hour.isBefore(endHour)) {
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

  return range;
};

const DayList = ({
  events,
  startOfRange,
  endOfRange,
  setPreviewPopupVisible,
  setRowDate,
  rowDate,
  isPreviewPopupVisible,
}) => {
  const range = buildRange(events, startOfRange, endOfRange);
  const onEventClick = (time) => () => {
    setRowDate(time);
    setPreviewPopupVisible(true);
  };

  return (
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

                const selectedEvent =
                  time.isSame(rowDate) && isPreviewPopupVisible
                    ? 'daygrid__row_selected'
                    : '';

                return (
                  <div
                    onClick={onEventClick(time)}
                    key={idx}
                    className={`schedule-range__event ${selectedEvent}`}
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
  );
};

const mapStateToProps = ({
  grid: { events, rowDate },
  range: { startOfRange, endOfRange },
  popups: { isPreviewPopupVisible },
}) => {
  return {
    events,
    startOfRange,
    endOfRange,
    rowDate,
    isPreviewPopupVisible,
  };
};

const mapDistatchToProps = {
  setPreviewPopupVisible,
  setRowDate,
};

export default connect(mapStateToProps, mapDistatchToProps)(DayList);
