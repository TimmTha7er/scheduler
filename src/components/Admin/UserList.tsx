import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setSortOrder, setOrder } from '../../redux/actions';
import { UserListBody } from '../../components';
import { RootState } from '../../redux/store';
import ErrorIndicator from '../supports/ErrorIndicator';
import { useHistory } from 'react-router';

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    admin: { orderBy, error, order },
  } = useSelector((state: RootState) => state);
  const history = useHistory();

  const className = `user-list__head-text_order-${order}`;
  const orderByName = orderBy === 'firstName' ? className : '';
  const orderByEmail = orderBy === 'email' ? className : '';
  const orderByCreatedAt = orderBy === 'createdAt' ? className : '';

  useEffect(() => {
    dispatch(setSelectedUser(null));
  }, []);

  const onOrderClick = (sortOrderBy: string) => () => {
    if (sortOrderBy === orderBy) {
      history.push({
        search: `orderBy=${sortOrderBy}&order=${
          order === 'asc' ? 'desc' : 'asc'
        }`,
      });
    } else {
      dispatch(setSortOrder(sortOrderBy));
      dispatch(setOrder('desc'));
      history.push({ search: `orderBy=${sortOrderBy}&order=desc` });
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
