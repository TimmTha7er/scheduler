import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { UserList, AdminPageLoader } from '../components';

const AdminPage: React.FC = () => {
  const {
    auth: { loading },
  } = useSelector((state: RootState) => state);

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
