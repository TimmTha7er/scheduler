import { IEvent } from '../../redux/interfaces';

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
  events: IEvent,
  startDay: moment.Moment,
  endDay: moment.Moment
): RangeType => {
  let start: moment.Moment = startDay.clone();
  let end: moment.Moment = endDay.clone().add(1, 'day');

  if (startDay.isSameOrAfter(endDay)) {
    end = startDay.clone().add(1, 'day');
    start = endDay.clone();
  }

  const day: moment.Moment = start.clone();
  const range: RangeType = [];
  let dayEvents: DayEventsType = [];

  while (day.isBefore(end, 'day')) {
    const startHour: moment.Moment = day.clone().startOf('day').startOf('hour');
    const endHour: moment.Moment = day.clone().endOf('day').endOf('hour');
    const hour: moment.Moment = startHour.clone();

    while (hour.isBefore(endHour)) {
      if (events[hour.toString()]) {
        dayEvents.push({ ...events[hour.toString()], time: hour.clone() });
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
