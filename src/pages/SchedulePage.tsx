import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  fetchEvents,
  setALLPopupsUnvisible,
  setRowDate,
} from '../redux/actions';
import { Route, Switch, useRouteMatch, NavLink } from 'react-router-dom';
import { Range, NextDays, NextEvents } from '../components';

const SchedulePage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    nextEventsNum,
    nextDaysNum,
    startOfRange,
    endOfRange,
    selectValue,
  } = useSelector((state: RootState) => state.range);
  const match = useRouteMatch();

  // ????
  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const onLinkClick = () => {
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));
  };

  return (
    <div className='schedule-range'>
      <nav className='schedule-range__nav'>
        <NavLink
          onClick={onLinkClick}
          activeClassName='schedule-range__link_active'
          className='link schedule-range__link'
          to={{
            pathname: `${match.url}/range`,
            search: `?start=${startOfRange.format(
              'YYYY-MM-DD'
            )}&end=${endOfRange.format('YYYY-MM-DD')}`,
          }}
        >
          Промежуток
        </NavLink>
        <NavLink
          onClick={onLinkClick}
          activeClassName='schedule-range__link_active'
          className='link schedule-range__link'
          to={{
            pathname: `${match.url}/n-days`,
            search: `?num=${nextDaysNum}&interval=${selectValue}`,
          }}
        >
          В ближайшее время
        </NavLink>
        <NavLink
          onClick={onLinkClick}
          activeClassName='schedule-range__link_active'
          className='link schedule-range__link'
          to={{
            pathname: `${match.url}/n-events`,
            search: `?num=${nextEventsNum}`,
          }}
        >
          Ближайшие события
        </NavLink>
      </nav>

      <Switch>
        <Route path={`${match.path}/range`} component={Range} />
        <Route path={`${match.path}/n-days`} component={NextDays} />
        <Route path={`${match.path}/n-events`} component={NextEvents} />
      </Switch>
    </div>
  );
};

export default SchedulePage;
