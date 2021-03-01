import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setPreviewPopupVisible, setSelectedUser } from '../../redux/actions';
import { UserListLoader } from '../../components';
import { IUser } from '../../redux/interfaces';

const UserListBody: React.FC = () => {
  const dispatch = useDispatch();
  const {
    admin: { loading, selectedUser, filterBy, users },
  } = useSelector((state: RootState) => state);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

  useEffect(() => {
    dispatch(setSelectedUser(null));
  }, []);

  useEffect(() => {
    const res = users.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(filterBy.trim().toLowerCase()) ||
        user.email.toLowerCase().includes(filterBy.trim().toLowerCase())
      );
    });

    setFilteredUsers(res);
  }, [filterBy, users]);

  if (loading) {
    return <UserListLoader />;
  }

  const onUserClick = (id: string) => async () => {
    const [user] = users.filter((user) => user.id === id);

    dispatch(setSelectedUser(user));
    dispatch(setPreviewPopupVisible(true));
  };

  return (
    <tbody className='user-list__body'>
      {filteredUsers.map(({ firstName, email, createdAt, id }, idx: number) => {
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
