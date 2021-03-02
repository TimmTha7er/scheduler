import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import {
  useActions,
  useRouter,
  useTypedSelector,
} from '../components/supports/Hooks/';
import { Message, ControlPanel, Day } from '../components';

const DayPage: React.FC = () => {
  const { setDate } = useActions();
  const {
    auth: { needVerification, user },
    datePicker: { date },
  } = useTypedSelector((state) => state);

  const { history, query } = useRouter();
  const showDateQuery = query.date || '';

  useEffect(() => {
    if (!moment(showDateQuery, 'YYYY-MM-DD', true).isValid()) {
      history.replace({
        search: `?date=${date.format('YYYY-MM-DD')}`,
      });
    } else {
      setDate(moment(showDateQuery, 'YYYY-MM-DD'));
    }
  }, [showDateQuery]);

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
