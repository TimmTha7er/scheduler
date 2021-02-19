import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useQuery } from '../components/supports/hooks';
import { useHistory } from 'react-router';
import { NextDays } from '../components';

const NextDaysPage: React.FC = () => {
  const {
    range: { selectValue, nextDaysNum },
  } = useSelector((state: RootState) => state);

  const history = useHistory();
  const query = useQuery();
  const num = query.get('num') || '';
  const interval = query.get('interval') || '';
  const numPattern = /^(?:\d{1}|\d{2})$/;
  const intervalPattern = /суток|часов/;

  useEffect(() => {
    if (!numPattern.test(num) || !intervalPattern.test(interval)) {
      history.push({
        search: `?num=${nextDaysNum}&interval=${selectValue}`,
      });
    }
  }, []);

  return (
    <>
      <NextDays />
      {/* <DayList range={range} msg={`за ближайшие ${num} ${selectValue}`} /> */}
    </>
  );
};

export default NextDaysPage;
