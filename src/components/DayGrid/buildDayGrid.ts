export const buildDayGrid = (date: moment.Moment): moment.Moment[] => {
  const startHour: moment.Moment = date.clone().startOf('day').startOf('hour');
  const endHour: moment.Moment = date.clone().endOf('day').endOf('hour');

  const hour: moment.Moment = startHour.clone().subtract(1, 'hour');
  const dayGrid: moment.Moment[] = [];

  while (hour.isBefore(endHour, 'hour')) {
    dayGrid.push(hour.add(1, 'hour').clone());
  }

  return dayGrid;
};
