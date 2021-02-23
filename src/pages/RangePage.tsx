import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import { useQuery } from '../components/supports/hooks';
import {
  ControlPanel,
  ScheduleNav,
  AdminControlPanel,
  Range,
} from '../components';

const RangePage: React.FC = () => {
  const {
    auth: { user },
    range: { startOfRange, endOfRange },
  } = useSelector((state: RootState) => state);
  const history = useHistory();
  const query = useQuery();
  const startDate = query.get('start');
  const endDate = query.get('end');

  useEffect(() => {
    if (
      !moment(startDate, 'YYYY-MM-DD', true).isValid() ||
      !moment(endDate, 'YYYY-MM-DD', true).isValid()
    ) {
      history.replace({
        search: `?start=${startOfRange.format(
          'YYYY-MM-DD'
        )}&end=${endOfRange.format('YYYY-MM-DD')}`,
      });
    }
  }, []);

  return (
    <>
      {user?.role === 'admin' ? <AdminControlPanel /> : <ControlPanel />}
      <div className='schedule-range'>
        <ScheduleNav />
        <Range />
      </div>
    </>
  );
};

export default RangePage;
