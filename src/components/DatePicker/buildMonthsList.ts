export const buildMonthsList = (value: moment.Moment): moment.Moment[] => {
  const startMonth: moment.Moment = value.clone().startOf('year');
  const endMonth: moment.Moment = value.clone().endOf('year');

  const month: moment.Moment = startMonth.clone().subtract(1, 'month');
  const monthsList: moment.Moment[] = [];

  while (month.isBefore(endMonth, 'month')) {
    monthsList.push(month.add(1, 'month').clone());
  }

  return monthsList;
};
