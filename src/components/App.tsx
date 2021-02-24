import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLoading,
  getUserById,
  setNeedVerification,
  fetchEvents,
  fetchUsers,
} from '../redux/actions';
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
import { RootState } from '../redux/store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { user },
    admin: { orderBy, order },
  } = useSelector((state: RootState) => state);

  // Check if user exists
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await dispatch(getUserById(user.uid));

        if (!user.emailVerified) {
          dispatch(setNeedVerification(true));
        } else {
          dispatch(setNeedVerification(false));
        }
      }

      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      dispatch(fetchUsers(orderBy, order));
    }

    if (user && user.role === 'user') {
      dispatch(fetchEvents());
    }
  }, [user, orderBy, order]);

  return (
    <>
      <PerfectScrollbar>
        <div className='container'>
          <Header></Header>
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
