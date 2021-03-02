import React from 'react';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../supports/Hooks';

interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<RouteProps>;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const {
    auth: { authenticated, user },
    datePicker: { date },
  } = useTypedSelector((state) => state);
  const { state: { from, query } = {} } = useLocation<{
    from: string;
    query: string;
  }>();

  const redirect =
    user?.role === 'admin' ? (
      <Redirect to='/admin' />
    ) : (
      <Redirect
        to={{
          pathname: from || '/day',
          search: query || `?date=${date.format('YYYY-MM-DD')}`,
        }}
      />
    );

  return (
    <Route
      {...rest}
      render={(props) => (!authenticated ? <Component {...props} /> : redirect)}
    />
  );
};

export default PublicRoute;
