import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setALLPopupsUnvisible, setRowDate } from '../redux/actions';
import { Switch, useRouteMatch, NavLink } from 'react-router-dom';
import {
  Range,
  NextDays,
  NextEvents,
  PrivateRoute,
  ControlPanel,
  ScheduleLoader,
} from '../components';

const SchedulePage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    range: {
      nextEventsNum,
      nextDaysNum,
      startOfRange,
      endOfRange,
      selectValue,
    },
    grid: { loading },
  } = useSelector((state: RootState) => state);
  const match = useRouteMatch();

  const onLinkClick = () => {
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));
  };

  if (loading) {
    return <ScheduleLoader />;
  }

  return (
    <>
      <ControlPanel></ControlPanel>

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
          <PrivateRoute path={`${match.path}/range`} component={Range} />
          <PrivateRoute path={`${match.path}/n-days`} component={NextDays} />
          <PrivateRoute
            path={`${match.path}/n-events`}
            component={NextEvents}
          />
          {/* <PublicRoute component={NotFound} /> */}
        </Switch>
      </div>
    </>
  );
};

export default SchedulePage;
