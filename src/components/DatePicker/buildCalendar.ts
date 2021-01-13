export const buildCalendar = (value: moment.Moment): moment.Moment[][] => {
  const startDay: moment.Moment = value.clone().startOf('month').startOf('week');
  const endDay: moment.Moment = startDay.clone().add(5, 'week');

  const day: moment.Moment = startDay.clone().subtract(1, 'day');
  const calendar:moment.Moment[][]  = [];

  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  // console.log('buildCalendar');
  

  return calendar;
};