import React from "react";

const TimeRuler: React.FC  = () => {
  const timesList: Array<string> = Array(24).fill(0).map((item, idx: number) => {    
    return idx < 10 ? `0${idx}:00` : `${idx}:00`;
  });

  return (
    <div className='time-ruler'>
      <div className='time-ruler__header'>
        <div className='time-ruler__empty-row time-ruler__empty-row_high'></div>
        <div className='time-ruler__empty-row'></div>
      </div>
      <div className='time-ruler__cells'>
        {timesList.map((item: string, idx: number) => {
          return (
            <div key={idx} className='time-ruler__cell'>
              <div className='time-ruler__time'>{item}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeRuler;
