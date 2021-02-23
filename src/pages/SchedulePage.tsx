import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, useHistory, useRouteMatch, Route } from 'react-router-dom';
import { PrivateRoute, NotFound } from '../components';
import { useQuery } from '../components/supports/hooks';
import { fetchEvents, setSelectedUser } from '../redux/actions';
import { RootState } from '../redux/store';
import { NextDaysPage, NextEventsPage, RangePage } from './';

const SchedulePage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { user },
    admin: { users },
  } = useSelector((state: RootState) => state);
  const match = useRouteMatch();
  const history = useHistory();
  const query = useQuery();
  const uid = query.get('uid');

  useEffect(() => {
    if (user?.role === 'admin' && uid) {
      dispatch(fetchEvents(uid));
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 'admin') {
      if (uid) {
        const selectedUser = users.filter((user) => user.id === uid)[0];
        dispatch(setSelectedUser(selectedUser));
      }

      if (!uid) {
        history.replace('/admin');
      }
    }
  }, [users]);

  return (
    <Switch>
      <PrivateRoute exact path={`${match.path}/range`} component={RangePage} />
      <PrivateRoute
        exact
        path={`${match.path}/n-days`}
        component={NextDaysPage}
      />
      <PrivateRoute
        exact
        path={`${match.path}/n-events`}
        component={NextEventsPage}
      />
      <Route exact path='*' component={NotFound} />
    </Switch>
  );
};

export default SchedulePage;
