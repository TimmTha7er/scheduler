import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
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
