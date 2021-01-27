import React, { useState, useEffect } from 'react';
import { buildYearsList } from './buildYearsList';
import upBtnImg from '../../img/angle-up.svg';
import downBtnImg from '../../img/angle-down.svg';

interface CalendarProps {
  date: moment.Moment;
  onChangeYear: (year: moment.Moment) => void;
  onSelectedYearClick: () => void;
}

const YearDwopdown: React.FC<CalendarProps> = ({
  date,
  onChangeYear,
  onSelectedYearClick,
}) => {
  const [yearsList, setYearsList] = useState<{
    years: moment.Moment[];
    middle: moment.Moment;
  }>({
    years: [],
    middle: date,
  });
  const [activeYear, setActiveYear] = useState<moment.Moment>(date);

  useEffect(() => {
    setYearsList({ ...yearsList, years: buildYearsList(date) });
  }, []);

  const onBtnUpClick = (): void => {
    setYearsList((prevState) => {
      const newMiddle: moment.Moment = prevState.middle.clone().add(1, 'year');
      const newYearsList: moment.Moment[] = buildYearsList(newMiddle);

      return { years: newYearsList, middle: newMiddle };
    });
  };

  const onBtnDownClick = (): void => {
    setYearsList((prevState) => {
      const newMiddle: moment.Moment = prevState.middle
        .clone()
        .subtract(1, 'year');
      const newYearsList: moment.Moment[] = buildYearsList(newMiddle);

      return { years: newYearsList, middle: newMiddle };
    });
  };

  const onYearClick = (year: moment.Moment) => (): void => {
    setActiveYear(year);
    setYearsList({ years: buildYearsList(year), middle: year });
    onChangeYear(year);
    onSelectedYearClick();
  };

  return (
    <ul className='datepicker__year-dropdown'>
      <li
        onClick={onBtnUpClick}
        className='datepicker__year-option datepicker__year-option_btn'
      >
        {/* <span className='datepicker__navigation datepicker__navigation_years-upcoming icon icon-up-open-big'> */}
        <div className='datepicker__navigation datepicker__navigation_years-upcoming'>
          <img className='datepicker__btn-img' src={upBtnImg} alt='^' />
        </div>
      </li>
      {yearsList.years.map((item: moment.Moment, idx: number) => {
        const className: string = item.isSame(activeYear, 'year')
          ? 'datepicker__year-option_selected'
          : '';

        return (
          <li
            onClick={onYearClick(item)}
            key={idx}
            className={`datepicker__year-option ${className}`}
          >
            {item.format('YYYY')}
          </li>
        );
      })}
      <li
        onClick={onBtnDownClick}
        className='datepicker__year-option datepicker__year-option_btn'
      >
        {/* <span className='datepicker__navigation datepicker__navigation_years-previous icon icon-down-open-big'> */}
        <div className='datepicker__navigation datepicker__navigation_years-previous'>
          <img className='datepicker__btn-img' src={downBtnImg} alt='v' />
        </div>
      </li>
    </ul>
  );
};

export default React.memo(YearDwopdown);
// export default YearDwopdown;
