import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';

import { push } from 'connected-react-router';
import { AppLoader } from '..';

interface AdminRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const dispatch = useDispatch();
  const { authenticated, user, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();

  const red = () => {
    console.log('/sign-innn');

    dispatch(
      push({
        pathname: '/sign-innn',
        state: {
          from: location.pathname,
          query: location.search,
        },
      })
    );
  };

  // red();

  // if (loading) {
  //   return <AppLoader />;
  // }

  return (
    <Route
      {...rest}
      render={(props) =>
        loading || (authenticated && user && user.role === 'admin') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              // state: {
              //   from: location.pathname,
              //   query: location.search,
              // },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
