import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useQuery } from '../components/supports/hooks';
import { useHistory } from 'react-router';
import { NextEvents } from '../components';

const NextEventsPage: React.FC = () => {
  const {
    range: { nextEventsNum },
  } = useSelector((state: RootState) => state);

  const history = useHistory();
  const query = useQuery();
  const num = query.get('num') || '';
  const pattern = /^(?:\d{1}|\d{2})$/;

  useEffect(() => {
    if (!pattern.test(num)) {
      history.push({
        search: `?num=${nextEventsNum}`,
      });
    }
  }, []);

  return (
    <>
      <NextEvents />
      {/* <DayList range={range} msg={`за ближайшие ${num} ${selectValue}`} /> */}
    </>
  );
};

export default NextEventsPage;
