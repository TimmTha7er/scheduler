import React, { useEffect } from 'react';
import { UserList, AdminPageLoader, AdminUsersFilter } from '../components';
import {
  useActions,
  useRouter,
  useTypedSelector,
} from '../components/supports/Hooks/';

const AdminPage: React.FC = () => {
  const { setSortOrder, setOrder } = useActions();
  const {
    auth: { loading },
    admin: { sortBy, order },
  } = useTypedSelector((state) => state);

  const { history, query } = useRouter();
  const querySortBy = query.sortBy || '';
  const querySortOrder = query.order || '';

  useEffect(() => {
    if (
      !querySortBy ||
      (querySortOrder !== 'asc' && querySortOrder !== 'desc')
    ) {
      history.replace({
        search: `?sortBy=${sortBy}&order=${order}`,
      });
    } else {
      setSortOrder(querySortBy);
      setOrder(querySortOrder);
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
