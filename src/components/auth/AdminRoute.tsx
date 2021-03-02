import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useTypedSelector } from '../supports/Hooks';

interface AdminRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const AdminRoute: React.FC<AdminRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const {
    auth: { authenticated, user, loading },
  } = useTypedSelector((state) => state);

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
