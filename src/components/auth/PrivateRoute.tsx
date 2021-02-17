import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const {
    auth: { authenticated, loading },
    router: { location },
  } = useSelector((state: RootState) => state);

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
