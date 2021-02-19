import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import {
  setLoading,
  getUserById,
  setNeedVerification,
  fetchEvents,
  fetchUsers,
} from '../redux/actions';
import { Switch } from 'react-router-dom';
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
} from '../components';
import '../scss/index.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();

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

        // get events
        dispatch(fetchEvents());

        // ??? временно
        // get users
        dispatch(fetchUsers());
      }

      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <>
      <PerfectScrollbar>
        <div className='container'>
          <Header></Header>
          <main className='main'>
            <Switch>
              <PublicRoute exact path='/' component={HomePage} />
              <PrivateRoute path='/day' component={DayPage} />
              <PrivateRoute path='/schedule' component={SchedulePage} />
              <PublicRoute path='/sign-up' component={SignUpPage} />
              <PublicRoute path='/sign-in' component={SignInPage} />
              <PublicRoute
                path='/forgot-password'
                component={ForgotPasswordPage}
              />

              <AdminRoute path='/admin' component={AdminPage} />

              {/* <Route exact path='*' component={NotFound} /> */}
            </Switch>
          </main>
        </div>
      </PerfectScrollbar>

      <Popups />
    </>
  );
};

export default App;
