import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setDate, setSuccess } from '../redux/actions';
import { useQuery } from '../components/supports/hooks';
import { push } from 'connected-react-router';
import moment from 'moment';
import 'moment/locale/ru';
import { Message, ControlPanel, Day } from '../components';

const DayPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    auth: { needVerification, success },
    datePicker: { date },
  } = useSelector((state: RootState) => state);

  const query = useQuery();
  const showDate = query.get('date') || '';

  useEffect(() => {
    if (!moment(showDate, 'YYYY-MM-DD', true).isValid()) {
      dispatch(
        push({
          search: `?date=${date.format('YYYY-MM-DD')}`,
        })
      );
    } else {
      dispatch(setDate(moment(showDate, 'YYYY-MM-DD')));
    }
  }, [showDate]);

  // useEffect(() => {
  //   if (success) {
  //     dispatch(setSuccess(''));
  //   }
  // }, [success, dispatch]);

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
