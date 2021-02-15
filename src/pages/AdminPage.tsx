import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchEvents } from '../redux/actions';
import { EventList, EmptyDayList } from '../components';
import SchedulerService from '../services/SchedulerService';
import moment from 'moment';
import 'moment/locale/ru';

const schedulerService = new SchedulerService();

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    admin: { loading, users },
  } = useSelector((state: RootState) => state);

  if (loading) {
    return <div>admin loading...</div>;
  }

  const onUserClick = (id: string) => async () => {
    console.log(`click on user ${id}`);
    console.log('events', await schedulerService.getEvents(id));
    dispatch(fetchEvents(id));
  };

  return (
    <div className='admin'>
      <table className='user-list'>
        <thead className='user-list__head'>
          <tr className='user-list__row user-list__row_head'>
            <th className='user-list__head-cell'>Имя</th>
            <th className='user-list__head-cell'>Почта</th>
            <th className='user-list__head-cell'>Дата регистрации</th>
            <th className='user-list__head-cell'>ID</th>
          </tr>
        </thead>

        <tbody className='user-list__body'>
          {users.map(({ firstName, email, createdAt, id }, idx: number) => {
            const date = moment(
              new Date(1970, 0, 1).setSeconds(createdAt.seconds)
            )
              .clone()
              .format('DD MM YYYY');

            return (
              <tr
                onClick={onUserClick(id)}
                key={idx}
                className='user-list__row'
              >
                <td className='user-list__body-cell' data-label='Имя'>
                  {firstName}
                </td>
                <td className='user-list__body-cell' data-label='Почта'>
                  {email}
                </td>
                <td
                  className='user-list__body-cell'
                  data-label='Дата регистрации'
                >
                  {date}
                </td>
                <td className='user-list__body-cell' data-label='ID'>
                  {id}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
