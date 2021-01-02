// import react from "react";
import TimeRuler from '../TimeRuler/TimeRuler.jsx';
import DayGrid from '../DayGrid/DayGrid.jsx';

const Day = () => {
  return (
    <div className='day'>
      <div className='day__left-col'>
        <TimeRuler></TimeRuler>
      </div>
      <div className='day__right-col'>
        <DayGrid selectedMonthDay="29" selectedWeedDay="вт"></DayGrid>
      </div>
    </div>
  );
};

export default Day;
