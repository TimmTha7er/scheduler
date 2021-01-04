import { useState } from 'react';

const buildYearsList = (value) => {
  const startYear = value.clone().add(5, 'year');
  const endYear = value.clone().subtract(5, 'year');

  const year = startYear.clone().add(1, 'year');
  const yearsList = [];

  while (year.isAfter(endYear, 'year')) {
    yearsList.push(year.subtract(1, 'year').clone());
  }

  return yearsList;
};

const YearDwopdown = ({ date, onChangeYear }) => {
  const [yearsList, setYearsList] = useState({
    years: buildYearsList(date),
    middle: date,
  });
  const [activeYear, setActiveYear] = useState(date);

  const onBtnUpClick = () => {
    setYearsList((state) => {
      const newMiddle = state.middle.clone().add(1, 'year');
      const newYearsList = buildYearsList(newMiddle);

      return { years: newYearsList, middle: newMiddle };
    });
  };

  const onBtnDownClick = () => {
    setYearsList((state) => {
      const newMiddle = state.middle.clone().subtract(1, 'year');
      const newYearsList = buildYearsList(newMiddle);

      return { years: newYearsList, middle: newMiddle };
    });
  };

  const onYearClick = (year) => () => {
    setActiveYear(year);
    setYearsList({ years: buildYearsList(year), middle: year });
    onChangeYear(year);
  };

  return (
    <div className='datepicker__year-dropdown'>
      <div onClick={onBtnUpClick} className='datepicker__year-option'>
        <a className='datepicker__navigation datepicker__navigation_years-upcoming icon icon-up-open-big'></a>
      </div>
      {yearsList.years.map((item, idx) => {
        const className = item.isSame(activeYear, 'year')
          ? 'datepicker__year-option datepicker__year-option_selected'
          : 'datepicker__year-option';
        return (
          <div onClick={onYearClick(item)} key={idx} className={className}>
            {item.format('YYYY')}
          </div>
        );
      })}
      <div onClick={onBtnDownClick} className='datepicker__year-option'>
        <a className='datepicker__navigation datepicker__navigation_years-previous icon icon-down-open-big'></a>
      </div>
    </div>
  );
};

export default YearDwopdown;
