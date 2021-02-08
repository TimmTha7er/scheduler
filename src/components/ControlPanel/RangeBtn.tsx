import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { setALLPopupsUnvisible, setRowDate } from '../../redux/actions';
import { RootState } from '../../redux/store';

const RangeBtn: React.FC = () => {
  const dispatch = useDispatch();
  const {
    datePicker: { date },
    range: { startOfRange, endOfRange },
  } = useSelector((state: RootState) => state);
  const location = useLocation();

  const onRangeBtnClick = (): void => {
    console.log('onRangeBtnClick location', location);
    dispatch(setALLPopupsUnvisible());
    dispatch(setRowDate(null));
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
