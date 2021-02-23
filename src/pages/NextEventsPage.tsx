import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useQuery } from '../components/supports/hooks';
import { useHistory } from 'react-router';
import {
  NextEvents,
  ScheduleNav,
  ControlPanel,
  AdminControlPanel,
} from '../components';

const NextEventsPage: React.FC = () => {
  const {
    auth: { user },
    range: { nextEventsNum },
  } = useSelector((state: RootState) => state);

  const history = useHistory();
  const query = useQuery();
  const num = query.get('num') || '';
  const pattern = /^(?:\d{1}|\d{2})$/;

  useEffect(() => {
    if (!pattern.test(num)) {
      history.replace({
        search: `?num=${nextEventsNum}`,
      });
    }
  }, []);

  return (
    <>
      {user?.role === 'admin' ? <AdminControlPanel /> : <ControlPanel />}
      <div className='schedule-range'>
        <ScheduleNav />
        <NextEvents />
      </div>
    </>
  );
};

export default NextEventsPage;
