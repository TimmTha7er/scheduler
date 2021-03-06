import { Event } from '../../redux/types';

export const isDayHasEvents = (value: moment.Moment, events: Event) => {
  const startOfDay: moment.Moment = value.clone().startOf('day');
  const endOfDay: moment.Moment = value.clone().add(1, 'day').startOf('day');

  while (startOfDay.isBefore(endOfDay, 'hour')) {
    if (events[startOfDay.toString()]) {
      return true;
    }

    startOfDay.add(1, 'hour');
  }

  return false;
};
