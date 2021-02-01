import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchEvents, setDate } from '../redux/actions';
import { useQuery } from '../components/supports/hooks';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import { TimeRuler, DayGrid } from '../components';

const DayPage: React.FC = () => {
  const dispatch = useDispatch();
  const { date } = useSelector((state: RootState) => state.datePicker);

  const history = useHistory();
  const query = useQuery();
  const showDate = query.get('date') || '';

  useEffect(() => {
    dispatch(fetchEvents());

    if (showDate === '') {
      history.push({
        search: `?date=${date.format('YYYY-MM-DD')}`,
      });
    }
  }, []);

  useEffect(() => {
    dispatch(setDate(moment(showDate, 'YYYY-MM-DD')));
  }, [showDate]);

  return (
    <>
      <div className='day'>
        <div className='day__left-col'>
          <TimeRuler></TimeRuler>
        </div>
        <div className='day__right-col'>
          <DayGrid></DayGrid>
        </div>
      </div>
      {/* <Popups /> */}
    </>
  );
};

export default DayPage;
