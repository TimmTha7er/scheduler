import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useTypedSelector } from '../supports/Hooks';

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
  } = useTypedSelector((state) => state);

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
