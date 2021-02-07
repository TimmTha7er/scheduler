import React from 'react';
import calendarImg from '../../img/calendar.svg';

interface EmptyDayListProps {
  msg: string;
}

const EmptyDayList: React.FC<EmptyDayListProps> = ({ msg }) => {
  return (
    <div className='empty-day-list'>
      <img src={calendarImg} alt='calendar' className='empty-day-list__icon' />
      <div className='empty-day-list__text'>Нет событий</div>
      <div className='empty-day-list__text'>{msg}</div>
    </div>
  );
};

export default EmptyDayList;
