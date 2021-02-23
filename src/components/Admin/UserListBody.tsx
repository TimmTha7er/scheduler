import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setPreviewPopupVisible, setSelectedUser } from '../../redux/actions';
import { UserListLoader } from '../../components';

const UserListBody: React.FC = () => {
  const dispatch = useDispatch();
  const {
    admin: { loading, users, selectedUser },
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(setSelectedUser(null));
  }, []);

  if (loading) {
    return <UserListLoader />;
  }

  const onUserClick = (id: string) => async () => {
    dispatch(setSelectedUser(users.filter((user) => user.id === id)[0]));
    dispatch(setPreviewPopupVisible(true));
  };

  return (
    <tbody className='user-list__body'>
      {users.map(({ firstName, email, createdAt, id }, idx: number) => {
        const selected: string =
          id === selectedUser?.id ? 'user-list__row_selected' : '';

        return (
          <tr
            onClick={onUserClick(id)}
            key={idx}
            className={`user-list__row ${selected}`}
          >
            <td className='user-list__body-cell' data-label='Имя'>
              {firstName}
            </td>
            <td className='user-list__body-cell' data-label='Почта'>
              {email}
            </td>
            <td className='user-list__body-cell' data-label='Дата регистрации'>
              {createdAt}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default UserListBody;
