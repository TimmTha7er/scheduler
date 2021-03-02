import React from 'react';
import { NavLink } from 'react-router-dom';
import { ScheduleNavLoader } from '../../components';
import { useActions, useTypedSelector } from '../supports/Hooks';

const ScheduleNav: React.FC = () => {
  const { setALLPopupsUnvisible, setRowDate } = useActions();
  const {
    range: {
      nextEventsNum,
      nextDaysNum,
      startOfRange,
      endOfRange,
      selectValue,
    },
    auth: { user, loading },
    admin: { selectedUser },
  } = useTypedSelector((state) => state);
  const uidQuery = user?.role === 'admin' ? `&uid=${selectedUser?.id}` : '';

  const onLinkClick = () => {
    setALLPopupsUnvisible();
    setRowDate(null);
  };

  if (loading) {
    return <ScheduleNavLoader />;
  }

  return (
    <nav className='schedule-range__nav'>
      <NavLink
        onClick={onLinkClick}
        activeClassName='schedule-range__link_active'
        className='link schedule-range__link'
        to={{
          pathname: `/schedule/range`,
          search: `?start=${startOfRange.format(
            'YYYY-MM-DD'
          )}&end=${endOfRange.format('YYYY-MM-DD')}${uidQuery}`,
        }}
      >
        Промежуток
      </NavLink>
      <NavLink
        onClick={onLinkClick}
        activeClassName='schedule-range__link_active'
        className='link schedule-range__link'
        to={{
          pathname: `/schedule/n-days`,
          search: `?num=${nextDaysNum}&interval=${selectValue}${uidQuery}`,
        }}
      >
        В ближайшее время
      </NavLink>
      <NavLink
        onClick={onLinkClick}
        activeClassName='schedule-range__link_active'
        className='link schedule-range__link'
        to={{
          pathname: `/schedule/n-events`,
          search: `?num=${nextEventsNum}${uidQuery}`,
        }}
      >
        Ближайшие события
      </NavLink>
    </nav>
  );
};

export default ScheduleNav;
