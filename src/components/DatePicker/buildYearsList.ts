export const buildYearsList = (value: moment.Moment): moment.Moment[] => {
  const startYear: moment.Moment = value.clone().add(5, 'year');
  const endYear: moment.Moment = value.clone().subtract(5, 'year');

  const year: moment.Moment = startYear.clone().add(1, 'year');
  const yearsList: moment.Moment[] = [];

  while (year.isAfter(endYear, 'year')) {
    yearsList.push(year.subtract(1, 'year').clone());
  }

  return yearsList;
};