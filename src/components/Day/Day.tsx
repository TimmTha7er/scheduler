import React from 'react';
import { TimeRuler, DayGrid } from "../../components";

const Day: React.FC = () => {
  return (
    <div className='day'>
      <div className='day__left-col'>
        <TimeRuler></TimeRuler>
      </div>
      <div className='day__right-col'>
        <DayGrid></DayGrid>
      </div>
    </div>
  );
};

export default Day;