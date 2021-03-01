import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { UserList, AdminPageLoader, AdminUsersFilter } from '../components';
import { useQuery } from '../components/supports/hooks';
import { useHistory } from 'react-router';
import { setSortOrder, setOrder } from '../redux/actions';

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { loading },
    admin: { sortBy, order },
  } = useSelector((state: RootState) => state);
  const history = useHistory();
  const query = useQuery();
  const querySortBy = query.get('sortBy') || '';
  const querySortOrder = query.get('order') || '';

  useEffect(() => {
    if (
      !querySortBy ||
      (querySortOrder !== 'asc' && querySortOrder !== 'desc')
    ) {
      history.replace({
        search: `?sortBy=${sortBy}&order=${order}`,
      });
    } else {
      dispatch(setSortOrder(querySortBy));
      dispatch(setOrder(querySortOrder));
    }
  }, [querySortBy, querySortOrder]);

  if (loading) {
    return <AdminPageLoader />;
  }

  return (
    <div className='admin'>
      <AdminUsersFilter />
      <UserList />
    </div>
  );
};

export default AdminPage;
