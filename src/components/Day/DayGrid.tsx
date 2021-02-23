import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { RowList } from '../../components';

const DayGrid: React.FC = () => {
  const { date } = useSelector((state: RootState) => state.datePicker);
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
