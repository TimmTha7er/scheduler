import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setDate } from '../redux/actions';
import { useQuery } from '../components/supports/hooks';
import moment from 'moment';
import 'moment/locale/ru';
import { Message, ControlPanel, Day } from '../components';
import { useHistory, Redirect } from 'react-router-dom';

const DayPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { needVerification, user },
    datePicker: { date },
  } = useSelector((state: RootState) => state);
  const history = useHistory();
  const query = useQuery();
  const showDate = query.get('date') || '';

  useEffect(() => {
    if (!moment(showDate, 'YYYY-MM-DD', true).isValid()) {
      history.replace({
        search: `?date=${date.format('YYYY-MM-DD')}`,
      });
    } else {
      dispatch(setDate(moment(showDate, 'YYYY-MM-DD')));
    }
  }, [showDate]);

  if (user?.role === 'admin') {
    return <Redirect to='/admin' />;
  }

  return (
    <>
      {needVerification && (
        <Message
          className='main__msg'
          type='success'
          msg='Please verify your email address.'
        />
      )}
      <ControlPanel />
      <Day />
    </>
  );
};

export default DayPage;
