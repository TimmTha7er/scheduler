import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { AppLoader } from '../../components';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { authenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const location = useLocation();

  // console.log('location', location);

  // if (loading) {
  //   return <AppLoader />;
  // }

  return (
    <Route
      {...rest}
      render={(props) =>
        loading || authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: {
                from: location.pathname,
                query: location.search,
              },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
