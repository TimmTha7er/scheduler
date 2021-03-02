import React from 'react';
import { TimeRuler, DayGrid, DayLoader } from '../../components';
import { useTypedSelector } from '../supports/Hooks';

const Day: React.FC = () => {
  const {
    auth: { loading },
  } = useTypedSelector((state) => state);

  if (loading) {
    return <DayLoader />;
  }

  return (
    <div className='day'>
      <div className='day__left-col'>
        <TimeRuler />
      </div>
      <div className='day__right-col'>
        <DayGrid />
      </div>
    </div>
  );
};

export default Day;
