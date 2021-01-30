import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Day, ScheduleRange } from '../../components';
import { fetchEvents } from '../../redux/actions';
import { RootState } from '../../redux/store';

const Main: React.FC = () => {
  const dispatch = useDispatch();
  const {
    range: { isRangeVisible },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  return (
    <main className='main'>{isRangeVisible ? <ScheduleRange /> : <Day />}</main>
  );
};

export default Main;
