import React, { useEffect } from 'react';
import { useRouter, useTypedSelector } from '../components/supports/Hooks/';
import {
  ControlPanel,
  ScheduleNav,
  AdminControlPanel,
  NextDays,
} from '../components';

const NextDaysPage: React.FC = () => {
  const {
    auth: { user },
    range: { selectValue, nextDaysNum },
  } = useTypedSelector((state) => state);

  const { history, query } = useRouter();
  const numQuery = query.num || '';
  const intervalQuery = query.interval || '';
  const numPattern = /^(?:\d{1}|\d{2})$/;
  const intervalPattern = /суток|часов/;

  useEffect(() => {
    if (!numPattern.test(numQuery) || !intervalPattern.test(intervalQuery)) {
      history.replace({
        search: `?num=${nextDaysNum}&interval=${selectValue}`,
      });
    }
  }, []);

  return (
    <>
      {user?.role === 'admin' ? <AdminControlPanel /> : <ControlPanel />}
      <div className='schedule-range'>
        <ScheduleNav />
        <NextDays />
      </div>
    </>
  );
};

export default NextDaysPage;
