import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setSortOrder } from '../../redux/actions';
import { UserListBody } from '../../components';
import { RootState } from '../../redux/store';
import ErrorIndicator from '../supports/ErrorIndicator';
import { useHistory } from 'react-router';

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    admin: { orderBy, error },
  } = useSelector((state: RootState) => state);
  const history = useHistory();
  const orderByName: string =
    orderBy === 'firstName' ? 'user-list__head-text_order' : '';
  const orderByEmail: string =
    orderBy === 'email' ? 'user-list__head-text_order' : '';
  const orderByCreatedAt: string =
    orderBy === 'createdAt' ? 'user-list__head-text_order' : '';

  useEffect(() => {
    dispatch(setSelectedUser(null));
  }, []);

  const onOrderClick = (sortOrder: string) => () => {
    dispatch(setSortOrder(sortOrder));
    history.push({search: `orderBy=${sortOrder}`});
  };

  if (error) {
    return (
      <div className='user-list'>
        <ErrorIndicator />
      </div>
    );
  }

  return (
    <div className='user-list'>
      <table className='user-list__table'>
        <thead className='user-list__head'>
          <tr className='user-list__row user-list__row_head'>
            <th className='user-list__head-cell'>
              <div
                onClick={onOrderClick('firstName')}
                className={`user-list__head-text ${orderByName}`}
              >
                Имя
              </div>
            </th>
            <th className='user-list__head-cell'>
              <div
                onClick={onOrderClick('email')}
                className={`user-list__head-text ${orderByEmail}`}
              >
                Почта
              </div>
            </th>
            <th className='user-list__head-cell'>
              <div
                onClick={onOrderClick('createdAt')}
                className={`user-list__head-text ${orderByCreatedAt}`}
              >
                Дата регистрации
              </div>
            </th>
          </tr>
          <tr className='user-list__empty-row'>
            <th className='user-list__empty-cell'></th>
            <th className='user-list__empty-cell'></th>
            <th className='user-list__empty-cell'></th>
          </tr>
        </thead>

        <UserListBody />
      </table>
    </div>
  );
};

export default UserList;
