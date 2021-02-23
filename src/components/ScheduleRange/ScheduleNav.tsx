import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setALLPopupsUnvisible, setRowDate } from '../../redux/actions';
import { NavLink } from 'react-router-dom';
import { ScheduleNavLoader } from '../../components';

const ScheduleNav: React.FC = () => {
  const dispatch = useDispatch();
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
  } = useSelector((state: RootState) => state);

  const uidQuery = user?.role === 'admin' ? `&uid=${selectedUser?.id}` : '';

  const onLinkClick = () => {
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));
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
