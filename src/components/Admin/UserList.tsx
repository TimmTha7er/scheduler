import React, { useEffect } from 'react';
import { UserListBody, ErrorIndicator } from '../../components';
import { useActions, useRouter, useTypedSelector } from '../supports/Hooks';

const UserList: React.FC = () => {
  const { setSelectedUser, setSortOrder, setOrder } = useActions();
  const {
    admin: { sortBy, error, order },
  } = useTypedSelector((state) => state);
  const { history } = useRouter();
  const sortByClass = `user-list__head-text_order-${order}`;

  useEffect(() => {
    setSelectedUser(null);
  }, []);

  const onOrderClick = (sortOrderBy: string) => () => {
    if (sortOrderBy === sortBy) {
      history.push({
        search: `sortBy=${sortOrderBy}&order=${
          order === 'asc' ? 'desc' : 'asc'
        }`,
      });
    } else {
      setSortOrder(sortOrderBy);
      setOrder('desc');
      history.push({ search: `sortBy=${sortOrderBy}&order=desc` });
    }
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
                className={`user-list__head-text ${
                  sortBy === 'firstName' && sortByClass
                }`}
              >
                Имя
              </div>
            </th>
            <th className='user-list__head-cell'>
              <div
                onClick={onOrderClick('email')}
                className={`user-list__head-text ${
                  sortBy === 'email' && sortByClass
                }`}
              >
                Почта
              </div>
            </th>
            <th className='user-list__head-cell'>
              <div
                onClick={onOrderClick('createdAt')}
                className={`user-list__head-text ${
                  sortBy === 'createdAt' && sortByClass
                }`}
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
