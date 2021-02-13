import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Redirect,
  RouteProps,
  // useHistory,
  // useRouteMatch,
  // useParams,
  useLocation,
} from 'react-router-dom';

import { RootState } from '../../redux/store';

interface PublicRouteProps extends RouteProps {
  component: any;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const {
    auth: { authenticated, loading },
    datePicker: { date },
  } = useSelector((state: RootState) => state);
  // const history = useHistory();
  const { state } = useLocation<{ from: string; query: string }>();
  const { from, query } = state || {};

  // if (loading) {
  //   return <div>loading...</div>
  // }

  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: from || '/day',
              search: query || `?date=${date.format('YYYY-MM-DD')}`,
              // state: history.location.state,
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
