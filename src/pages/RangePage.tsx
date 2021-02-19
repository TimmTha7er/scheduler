import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import { useQuery } from '../components/supports/hooks';
import { Range } from '../components';

const RangePage: React.FC = () => {
  const {
    range: { startOfRange, endOfRange },
  } = useSelector((state: RootState) => state);
  const history = useHistory();
  const query = useQuery();
  const startDate = query.get('start');
  const endDate = query.get('end');

  useEffect(() => {
    if (
      !moment(startDate, 'YYYY-MM-DD', true).isValid() ||
      !moment(endDate, 'YYYY-MM-DD', true).isValid()
    ) {
      history.push({
        search: `?start=${startOfRange.format(
          'YYYY-MM-DD'
        )}&end=${endOfRange.format('YYYY-MM-DD')}`,
      });
    }
  }, []);

  return (
    <>
      <Range />
      {/* <DayList range={range} msg={`за ближайшие ${num} ${selectValue}`} /> */}
    </>
  );
};

export default RangePage;
