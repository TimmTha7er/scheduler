import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import {
  ControlPanel,
  ScheduleNav,
  AdminControlPanel,
  Range,
} from '../components';
import { useRouter, useTypedSelector } from '../components/supports/Hooks/';

const RangePage: React.FC = () => {
  const {
    auth: { user },
    range: { startOfRange, endOfRange },
  } = useTypedSelector((state) => state);
  const { history, query } = useRouter();

  useEffect(() => {
    if (
      !moment(query.start, 'YYYY-MM-DD', true).isValid() ||
      !moment(query.end, 'YYYY-MM-DD', true).isValid()
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

export default React.memo(RangePage);
