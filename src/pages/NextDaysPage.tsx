import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useQuery } from '../components/supports/hooks';
import { useHistory } from 'react-router';
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
  } = useSelector((state: RootState) => state);

  const history = useHistory();
  const query = useQuery();
  const num = query.get('num') || '';
  const interval = query.get('interval') || '';
  const numPattern = /^(?:\d{1}|\d{2})$/;
  const intervalPattern = /суток|часов/;

  useEffect(() => {
    if (!numPattern.test(num) || !intervalPattern.test(interval)) {
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
