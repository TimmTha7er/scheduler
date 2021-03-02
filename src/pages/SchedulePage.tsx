import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute, NotFound } from '../components';
import {
  useActions,
  useRouter,
  useTypedSelector,
} from '../components/supports/Hooks/';
import { NextDaysPage, NextEventsPage, RangePage } from './';

const SchedulePage: React.FC = () => {
  const { fetchEvents, setSelectedUser } = useActions();
  const {
    auth: { user },
    admin: { users },
  } = useTypedSelector((state) => state);

  const { match, history, query } = useRouter();
  const uid = query.uid;

  useEffect(() => {
    if (user?.role === 'admin' && uid) {
      fetchEvents(uid);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 'admin') {
      if (uid) {
        const selectedUser = users.filter((user) => user.id === uid)[0];
        setSelectedUser(selectedUser);
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
