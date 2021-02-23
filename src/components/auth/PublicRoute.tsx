import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import { RootState } from '../../redux/store';

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
  } = useSelector((state: RootState) => state);
  const { state: { from, query } = {} } = useLocation<{
    from: string;
    query: string;
  }>();

  // console.log('user role', user?.role);

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
