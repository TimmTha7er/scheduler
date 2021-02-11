import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';

interface AdminRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { authenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated && user && user.role === 'admin' ? (
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

export default AdminRoute;
