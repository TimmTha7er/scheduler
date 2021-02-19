import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { TimeRuler, DayGrid, DayLoader } from '../../components';

const Day: React.FC = () => {
  const {
    auth: { loading },
  } = useSelector((state: RootState) => state);

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
