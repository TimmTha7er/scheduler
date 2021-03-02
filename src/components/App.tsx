import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Switch, Route } from 'react-router-dom';
import firebase from '../services/firebase/config';
import {
  HomePage,
  DayPage,
  SchedulePage,
  SignUpPage,
  SignInPage,
  ForgotPasswordPage,
  AdminPage,
} from '../pages';
import {
  Header,
  Popups,
  PublicRoute,
  PrivateRoute,
  AdminRoute,
  NotFound,
} from '../components';
import '../scss/index.scss';
import { useActions, useTypedSelector } from './supports/Hooks';

const App: React.FC = () => {
  const {
    setLoading,
    getUserById,
    setNeedVerification,
    fetchEvents,
    fetchUsers,
  } = useActions();
  const {
    auth: { user },
    admin: { sortBy, order },
  } = useTypedSelector((state) => state);

  // Check if user exists
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await getUserById(user.uid);

        if (!user.emailVerified) {
          setNeedVerification(true);
        } else {
          setNeedVerification(false);
        }
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchUsers(sortBy, order);
    }

    if (user && user.role === 'user') {
      fetchEvents();
    }
  }, [user, sortBy, order]);

  return (
    <>
      <PerfectScrollbar>
        <div className='container'>
          <Header />
          <main className='main'>
            <Switch>
              <PublicRoute exact path='/' component={HomePage} />
              <PrivateRoute exact path='/day' component={DayPage} />
              <AdminRoute exact path='/admin' component={AdminPage} />
              <PrivateRoute path='/schedule' component={SchedulePage} />
              <PublicRoute exact path='/sign-up' component={SignUpPage} />
              <PublicRoute exact path='/sign-in' component={SignInPage} />
              <PublicRoute
                exact
                path='/forgot-password'
                component={ForgotPasswordPage}
              />
              <Route exact path='*' component={NotFound} />
            </Switch>
          </main>
        </div>
      </PerfectScrollbar>

      <Popups />
    </>
  );
};

export default App;
