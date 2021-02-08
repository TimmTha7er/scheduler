import React, { useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
  setLoading,
  getUserById,
  setNeedVerification,
  fetchEvents,
} from '../redux/actions';
import {
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';
import firebase from '../services/firebase/config';
import {
  HomePage,
  DayPage,
  SchedulePage,
  SignUp,
  SignIn,
  ForgotPassword,
} from '../pages';
import {
  Header,
  Popups,
  AppLoader,
  PublicRoute,
  PrivateRoute,
} from '../components';
import '../scss/index.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

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
      }

      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className='container'>
        <Header></Header>
        <AppLoader />
      </div>
    );
  }

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
              {/* <PublicRoute component={NotFound} /> */}
            </Switch>
          </main>
        </div>
      </PerfectScrollbar>

      <Popups />
    </>
  );
};

export default App;
