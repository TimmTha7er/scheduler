const buildCalendar = (value) => {
  const startDay = value.clone().startOf('month').startOf('week');
  // const endDay = value.clone().endOf('month').endOf('week');
  const endDay = startDay.clone().add(5, 'week');
  
  const day = startDay.clone().subtract(1, 'day');
  const calendar = [];

  while (day.isBefore(endDay, 'day')) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, 'day').clone())
    );
  }

  return calendar;
};

export default buildCalendar;
