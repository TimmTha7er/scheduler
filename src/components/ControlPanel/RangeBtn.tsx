import React from 'react';
import { Link } from 'react-router-dom';
import { useActions, useRouter, useTypedSelector } from '../supports/Hooks';

const RangeBtn: React.FC = () => {
  const { setALLPopupsUnvisible, setRowDate } = useActions();
  const {
    datePicker: { date },
    range: { startOfRange, endOfRange },
  } = useTypedSelector((state) => state);
  const location = useRouter();

  const onRangeBtnClick = (): void => {
    setALLPopupsUnvisible();
    setRowDate(null);
  };

  return (
    <>
      {location.pathname === '/day' ? (
        <Link
          onClick={onRangeBtnClick}
          className='link control-panel__range-btn'
          to={{
            pathname: `/schedule/range`,
            search: `start=${startOfRange.format(
              'YYYY-MM-DD'
            )}&end=${endOfRange.format('YYYY-MM-DD')}`,
          }}
        >
          Расписание
        </Link>
      ) : (
        <Link
          onClick={onRangeBtnClick}
          className='link control-panel__range-btn'
          to={{
            pathname: `/day`,
            search: `date=${date.format('YYYY-MM-DD')}`,
          }}
        >
          День
        </Link>
      )}
    </>
  );
};

export default RangeBtn;
