import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
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
  SignUp,
  SignIn,
  ForgotPassword,
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

const App: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { user: authUser},
  } = useSelector((state: RootState) => state);

  // Check if user exists
  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));

        if (!user.emailVerified) {
          dispatch(setNeedVerification());
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
              <PublicRoute path='/sign-up' component={SignUp} />
              <PublicRoute path='/sign-in' component={SignIn} />
              <PublicRoute path='/forgot-password' component={ForgotPassword} />

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
