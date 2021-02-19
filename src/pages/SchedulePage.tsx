import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import { PrivateRoute, ControlPanel, ScheduleNav } from '../components';
import { NextDaysPage, NextEventsPage, RangePage } from './';

const SchedulePage: React.FC = () => {
  const match = useRouteMatch();

  return (
    <>
      <ControlPanel />
      <div className='schedule-range'>
        <ScheduleNav />
        <Switch>
          <PrivateRoute path={`${match.path}/range`} component={RangePage} />
          <PrivateRoute
            path={`${match.path}/n-days`}
            component={NextDaysPage}
          />
          <PrivateRoute
            path={`${match.path}/n-events`}
            component={NextEventsPage}
          />
          {/* <PublicRoute component={NotFound} /> */}
        </Switch>
      </div>
    </>
  );
};

export default SchedulePage;
