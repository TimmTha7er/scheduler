import React from 'react';
import { RowList } from '../../components';
import { useTypedSelector } from '../supports/Hooks';

const DayGrid: React.FC = () => {
  const { date } = useTypedSelector((state) => state.datePicker);
  const selectedMonthDay: string = date.format('D');
  const selectedWeedDay: string = date.format('ddd');

  return (
    <div className='daygrid'>
      <div className='daygrid__header'>
        <div className='daygrid__date-wrap'>
          <div className='daygrid__date'>
            <div className='daygrid__month-day'>{selectedMonthDay}</div>
            <div className='daygrid__week-day'>{selectedWeedDay}</div>
          </div>

          <div className='daygrid__empty-row'></div>
        </div>
      </div>

      <RowList />
    </div>
  );
};

export default DayGrid;
