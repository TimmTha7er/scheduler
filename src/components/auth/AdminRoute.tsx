import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface AdminRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { authenticated, user, loading } = useSelector(
    (state: RootState) => state.auth
  );

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
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;
