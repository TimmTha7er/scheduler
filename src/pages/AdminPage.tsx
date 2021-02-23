import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { UserList, AdminPageLoader } from '../components';
import { useQuery } from '../components/supports/hooks';
import { useHistory } from 'react-router';
import { setSortOrder } from '../redux/actions';

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { loading },
    admin: { orderBy },
  } = useSelector((state: RootState) => state);
  const history = useHistory();
  const query = useQuery();
  const sortOrder = query.get('orderBy') || '';

  useEffect(() => {
    if (!sortOrder) {
      history.replace({
        search: `?orderBy=${orderBy}`,
      });
    } else {
      dispatch(setSortOrder(sortOrder));
    }
  }, [sortOrder]);

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
