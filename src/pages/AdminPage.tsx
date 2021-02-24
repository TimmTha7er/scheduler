import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { UserList, AdminPageLoader } from '../components';
import { useQuery } from '../components/supports/hooks';
import { useHistory } from 'react-router';
import { setSortOrder, setOrder } from '../redux/actions';

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { loading },
    admin: { orderBy, order },
  } = useSelector((state: RootState) => state);
  const history = useHistory();
  const query = useQuery();
  const sortOrderBy = query.get('orderBy') || '';
  const sortOrder = query.get('order') || '';

  useEffect(() => {
    if (!sortOrderBy || (sortOrder !== 'asc' && sortOrder !== 'desc')) {
      history.replace({
        search: `?orderBy=${orderBy}&order=${order}`,
      });
    } else {
      dispatch(setSortOrder(sortOrderBy));
      dispatch(setOrder(sortOrder));
    }
  }, [sortOrderBy, sortOrder]);

  if (loading) {
    return <AdminPageLoader />;
  }

  return (
    <>
      <div className='admin'>
        <div className='admin__title'>Пользователи</div>
        <UserList />
      </div>
    </>
  );
};

export default AdminPage;
