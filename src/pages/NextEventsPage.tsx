import React, { useEffect } from 'react';
import {
  NextEvents,
  ScheduleNav,
  ControlPanel,
  AdminControlPanel,
} from '../components';
import { useRouter, useTypedSelector } from '../components/supports/Hooks/';

const NextEventsPage: React.FC = () => {
  const {
    auth: { user },
    range: { nextEventsNum },
  } = useTypedSelector((state) => state);

  const { history, query } = useRouter();
  const numQuery = query.num || '';
  const pattern = /^(?:\d{1}|\d{2})$/;

  useEffect(() => {
    if (!pattern.test(numQuery)) {
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
