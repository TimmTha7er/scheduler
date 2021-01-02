import { useState } from 'react';

const createYearsList = (year) => {
  const startYear = year - 5;
  const endYear = year + 5;

  const yearsList = Array(endYear - startYear + 1)
    .fill()
    .map((item, idx) => endYear - idx);

  return yearsList;
};

const YearDwopdown = ({ selectedYear }) => {
  const [yearsList, setYearsList] = useState({
    years: createYearsList(selectedYear),
    middle: selectedYear,
  });
  const [activeYear, setActiveYear] = useState(selectedYear);

  const onBtnUpClick = () => {
    setYearsList((state) => {
      const newMiddle = state.middle + 1;
      const newYearsList = createYearsList(newMiddle);

      return { years: newYearsList, middle: newMiddle };
    });
  };

  const onBtnDownClick = () => {
    setYearsList((state) => {
      const newMiddle = state.middle - 1;
      const newYearsList = createYearsList(newMiddle);

      return { years: newYearsList, middle: newMiddle };
    });
  };

  const onYearClick = (year) => () => {
    setActiveYear(year);
    setYearsList({ years: createYearsList(year), middle: year });
  };

  return (
    <div className='datepicker__year-dropdown'>
      <div onClick={onBtnUpClick} className='datepicker__year-option'>
        <a className='datepicker__navigation datepicker__navigation_years-upcoming icon icon-up-open-big'></a>
      </div>
      {yearsList.years.map((item, idx) => {
        const className =
          item === activeYear
            ? 'datepicker__year-option datepicker__year-option_selected'
            : 'datepicker__year-option';
        return (
          <div onClick={onYearClick(item)} key={idx} className={className}>
            {item}
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
