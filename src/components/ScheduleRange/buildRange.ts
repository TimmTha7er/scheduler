import { Event } from '../../redux/types';

export type EventType = {
  title: string;
  descr: string;
  time: moment.Moment;
};
export type DayEventsType = EventType[];

export type DayOfRangeType = {
  day: DayEventsType;
  time: moment.Moment;
};
export type RangeType = DayOfRangeType[];

export const buildRange = (
  events: Event,
  startDay: moment.Moment,
  endDay: moment.Moment,
  n?: number
): RangeType => {
  let start: moment.Moment = startDay.clone();
  let end: moment.Moment = endDay.clone();
  let idx = 0;
  let isFirst = true;

  if (startDay.isSameOrAfter(endDay)) {
    end = startDay.clone().add(1, 'day');
    start = endDay.clone().subtract(2, 'days');
  }

  const day: moment.Moment = start.clone();
  const range: RangeType = [];
  let dayEvents: DayEventsType = [];

  while (day.isSameOrBefore(end, 'day')) {
    const startHour: moment.Moment = day.clone().startOf('day').startOf('hour');
    let endHour: moment.Moment = day.clone().endOf('day').endOf('hour');
    let hour: moment.Moment = startHour.clone();

    // first iteration
    if (isFirst) {
      hour = startDay.clone();
      isFirst = false;
    }

    // last iteration
    if (end.diff(day, 'day') === 0) {
      endHour = endDay.clone();
    }

    while (hour.isBefore(endHour) && hour.isSame(day, 'day')) {
      if (events[hour.toString()]) {
        dayEvents.push({ ...events[hour.toString()], time: hour.clone() });
        idx += 1;
      }

      hour.add(1, 'hour');

      //  n-events
      if (n !== undefined && n === idx) {
        break;
      }
    }

    if (dayEvents.length > 0) {
      range.push({ day: dayEvents, time: day.clone() });
      dayEvents = [];
    }

    //  n-events
    if (n !== undefined && n === idx) {
      break;
    }

    day.add(1, 'day');
  }

  return range;
};
